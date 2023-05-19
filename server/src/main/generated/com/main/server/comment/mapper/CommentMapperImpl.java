package com.main.server.comment.mapper;

import com.main.server.comment.dto.CommentDto.Put;
import com.main.server.comment.dto.CommentDto.Response;
import com.main.server.comment.entity.Comment;
import com.main.server.comment.entity.Comment.CommentBuilder;
import java.sql.Timestamp;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-17T21:35:31+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class CommentMapperImpl implements CommentMapper {

    @Override
    public Response commentToCommentPostDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        String content = null;
        Timestamp createdAt = null;

        content = comment.getContent();
        createdAt = comment.getCreatedAt();

        Response response = new Response( content, createdAt );

        return response;
    }

    @Override
    public Comment commentPutDtoToComment(Put commentDto) {
        if ( commentDto == null ) {
            return null;
        }

        CommentBuilder comment = Comment.builder();

        comment.commentId( commentDto.getCommentId() );
        comment.content( commentDto.getContent() );

        return comment.build();
    }

    @Override
    public Response CommentToCommentPutDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        String content = null;
        Timestamp createdAt = null;

        content = comment.getContent();
        createdAt = comment.getCreatedAt();

        Response response = new Response( content, createdAt );

        return response;
    }

    @Override
    public Response CommentToCommentResponseDto(Comment comment) {
        if ( comment == null ) {
            return null;
        }

        String content = null;
        Timestamp createdAt = null;

        content = comment.getContent();
        createdAt = comment.getCreatedAt();

        Response response = new Response( content, createdAt );

        return response;
    }
}
