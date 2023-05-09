package com.main.server.board.mapper;

import com.main.server.board.dto.BoardDto;
import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import com.main.server.tag.entity.Tag;
import com.main.server.tag.service.TagService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper{
    Board boardDtoToBoard(BoardDto.Post boardDto);

    Board boardPutDtoToBoard(BoardDto.Put boardPutDto);
    BoardDto.Response boardToBoardResponse(Board response);



//    default Board boardDtoToBoard(BoardDto.Post boardDto){
//        Board board = new Board();
//
//
//        board.setTitle(boardDto.getTitle());
//        board.setContent(boardDto.getContent());
//
//
//
//        return board;
//
//    }

    // 태그가 없다면 태그 생성후 키값을 보드태그 테이블에 매핑
    // 태그가 있다면 그 태그의 키값을  보드태그 테이블에 매핑
}
