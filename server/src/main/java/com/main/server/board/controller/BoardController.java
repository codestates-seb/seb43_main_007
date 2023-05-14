package com.main.server.board.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.main.server.awsS3.StorageService;
import com.main.server.board.dto.BoardDto;
import com.main.server.board.entity.Board;
import com.main.server.board.mapper.BoardMapper;
import com.main.server.board.service.BoardService;

import com.main.server.dto.MultiResponseDto;
import com.main.server.tag.entity.Tag;
import com.main.server.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@RequestMapping("/boards")
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BoardController {
    private final BoardMapper boardMapper;

    private final BoardService boardService;

    private final StorageService service;
    private final AmazonS3 s3Client;

    @PostMapping()
    public ResponseEntity postBoard(@RequestBody @Valid BoardDto.Post boardPostDto){
        Board board = boardService.createBoard(boardMapper.boardDtoToBoard(boardPostDto));
        URI location = UriCreator.createUri("/boards", board.getBoardId());
        return ResponseEntity.created(location).build();
    }

    @PostMapping("/photo")
    public String postPhoto(@RequestParam(value = "file") MultipartFile file){
        return service.uploadFile(file);
    }

    @GetMapping("/{boardId}")
    public ResponseEntity getBoard(@PathVariable("boardId") @Positive long boardId){
        Board response = boardService.getBoard(boardId);

        return new ResponseEntity<>(boardMapper.boardToBoardResponse(response), HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity getAllBoard(@RequestParam(name = "page", defaultValue = "0") int page
            ,@PageableDefault(sort = "boardId", direction = Sort.Direction.DESC) Pageable pageable){
        if(page>0) page--;
        pageable = pageable.withPage(page);

        Page<Board> boards= boardService.getAllBoard(pageable);


        List<Board> boardList = boards.getContent();
        List<BoardDto.Response> responses = boardList.stream().map(boardMapper::boardToBoardResponse).collect(Collectors.toList());

        return new ResponseEntity<>( new MultiResponseDto<>(responses, boards),  HttpStatus.OK);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity putBoard(@PathVariable("boardId") long boardId,
                                   @RequestBody @Valid BoardDto.Put boardPutDto){
        boardPutDto.setBoardId(boardId);
        Board board = boardMapper.boardPutDtoToBoard(boardPutDto);
        Board response = boardService.putBoard(board);
        return new ResponseEntity<>(boardMapper.boardToBoardResponse(response), HttpStatus.OK);
    }



    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteBoard(@PathVariable("boardId") long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
