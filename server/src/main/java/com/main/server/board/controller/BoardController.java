package com.main.server.board.controller;

import com.amazonaws.services.s3.AmazonS3;
import com.main.server.Like.repository.LikeRepository;
import com.main.server.Like.service.LikeService;
import com.main.server.awsS3.StorageService;
import com.main.server.board.dto.BoardDto;
import com.main.server.board.entity.Board;
import com.main.server.board.mapper.BoardMapper;
import com.main.server.board.service.BoardService;

import com.main.server.bookmark.repository.BookmarkRepository;
import com.main.server.bookmark.service.BookmarkService;
import com.main.server.dto.MultiResponseDto;
import com.main.server.tag.entity.Tag;
import com.main.server.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
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

    private final LikeService likeService;
    private final BookmarkService bookmarkService;

    @PostMapping()
    public ResponseEntity postBoard(@RequestBody @Valid BoardDto.Post boardPostDto) {
        Board board = boardService.createBoard(boardMapper.boardDtoToBoard(boardPostDto));
        URI location = UriCreator.createUri("/boards", board.getBoardId());
        return ResponseEntity.created(location).build();
    }

    @PostMapping("/pin/{boardId}")
    public ResponseEntity postPin(@PathVariable("boardId") @Positive long boardId) {
        boardService.cretatePin(boardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/photo")
    public String postPhoto(@RequestParam(value = "file") MultipartFile file) {

        return service.uploadFile(file);
    }

//    @GetMapping("/{boardId}")
//    public ResponseEntity getBoard(@PathVariable("boardId") @Positive long boardId){
//        Board response = boardService.getBoard(boardId);
//
//        return new ResponseEntity<>(boardMapper.boardToBoardResponse(response), HttpStatus.OK);
//    }

    @GetMapping("/board")
    public ResponseEntity getBoard(@RequestBody @Valid BoardDto.Basic board) {
        Board response = boardService.getBoard(board.getBoardId());

        return new ResponseEntity<>(boardMapper.boardToBoardResponse(response, likeService, bookmarkService, board.getMemberId()), HttpStatus.OK);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity getAllBoard( @PathVariable("memberId") @Positive long memberId,
            @RequestParam(name = "cate", required = false) String cate,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "content", required = false) String content
            , @RequestParam(name = "page", defaultValue = "0") int page
            , @PageableDefault Pageable pageable) {
        if (page > 0) page--;
        Sort sort = Sort.by("pin").descending().and(Sort.by("boardId").descending());
        pageable = PageRequest.of(page, 10, sort);
        // pin을 기준으로 우선순위 내림차순
        if (cate == null) cate = "";
        if (title == null) title = "";
        if (content == null) content = "";

        Page<Board> boards = boardService.getAllBoard(pageable, cate, title, content, memberId);


    List<Board> boardList = boards.getContent();
    List<BoardDto.Response> responses = boardList.stream().map(board -> boardMapper.boardToBoardResponse(board, likeService, bookmarkService, memberId)).collect(Collectors.toList());

        return new ResponseEntity<>(new MultiResponseDto<>(responses, boards), HttpStatus.OK);
    }

    @PutMapping("/{boardId}")
    public ResponseEntity putBoard(@PathVariable("boardId") long boardId,
                                   @RequestBody @Valid BoardDto.Put boardPutDto) {
        boardPutDto.setBoardId(boardId);
        Board board = boardMapper.boardPutDtoToBoard(boardPutDto);
        Board response = boardService.putBoard(board);
        return new ResponseEntity<>(boardMapper.boardToBoardResponse(response, likeService, bookmarkService, boardPutDto.getMemberId()), HttpStatus.OK);
    }



    @DeleteMapping("/{boardId}")
    public ResponseEntity deleteBoard(@PathVariable("boardId") long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
