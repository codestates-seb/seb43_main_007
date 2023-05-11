package com.main.server.board.mapper;

import com.main.server.board.dto.BoardDto;
import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import com.main.server.tag.entity.Tag;
import com.main.server.tag.service.TagService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper{
    Board boardDtoToBoard(BoardDto.Post boardDto);

    Board boardPutDtoToBoard(BoardDto.Put boardPutDto);
    default BoardDto.Response boardToBoardResponse(Board response){
            if ( response == null ) {
                return null;
            }

            String title = null;
            String content = null;
            String address = null;
            LocalDateTime now = null;


            title = response.getTitle();
            content = response.getContent();
            address = response.getAddress();
            now = response.getNow();

            String photo = "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbu2jlU%2FbtsdeghMv6W%2F9r6Ft7XKr98DN2DJLVLQC0%2Fimg.png";

            int like = 0;
            int bookmark = 1;
            BoardDto.Response response1 = new BoardDto.Response( title, content, address, now, photo, like, bookmark );

            return response1;
        }
    }



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

