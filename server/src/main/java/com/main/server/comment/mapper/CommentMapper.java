package com.main.server.comment.mapper;

import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import lombok.Setter;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

   // default Comment commentDtoToComment(CommentDto.Post commentDto){
        //TODO. 댓글 등록

    };






