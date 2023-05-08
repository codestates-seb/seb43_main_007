package com.main.server.board.controller;

import com.main.server.board.dto.BoardDto;
import com.main.server.board.entity.Board;
import com.main.server.board.mapper.BoardMapper;
import com.main.server.board.service.BoardService;
import com.main.server.tag.entity.Tag;
import com.main.server.utils.UriCreator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;


@RequiredArgsConstructor
@RequestMapping("/boards")
@RestController
public class BoardController {
    private final BoardMapper boardMapper;

    private final BoardService boardService;

    @PostMapping()
    public ResponseEntity postBoard(@RequestBody @Valid BoardDto.Post boardPostDto){
        Board board = boardService.createBoard(boardMapper.boardDtoToBoard(boardPostDto));
        URI location = UriCreator.createUri("/boards", board.getBoardId());
        return ResponseEntity.created(location).build();
    }

}
