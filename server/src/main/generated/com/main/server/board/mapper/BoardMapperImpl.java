package com.main.server.board.mapper;

import com.main.server.board.dto.BoardDto.Put;
import com.main.server.board.entity.Board;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-17T21:35:31+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class BoardMapperImpl implements BoardMapper {

    @Override
    public Board boardPutDtoToBoard(Put boardPutDto) {
        if ( boardPutDto == null ) {
            return null;
        }

        Board board = new Board();

        board.setBoardId( boardPutDto.getBoardId() );
        board.setTitle( boardPutDto.getTitle() );
        board.setContent( boardPutDto.getContent() );
        board.setAddress( boardPutDto.getAddress() );

        return board;
    }
}
