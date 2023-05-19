package com.main.server.Like.mapper;

import com.main.server.Like.dto.LikeDto;
import com.main.server.Like.entity.Like;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-17T21:35:31+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class LikeMapperImpl implements LikeMapper {

    @Override
    public Like likeDtoToLike(LikeDto likeDto) {
        if ( likeDto == null ) {
            return null;
        }

        Like like = new Like();

        like.setMemberId( likeDto.getMemberId() );
        like.setBoardId( likeDto.getBoardId() );

        return like;
    }
}
