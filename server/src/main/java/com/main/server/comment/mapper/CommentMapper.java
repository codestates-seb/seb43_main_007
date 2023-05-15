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
   CommentDto.Response commentToCommentPostDto(Comment comment);
    //엔티티를 디티오로 변환할꺼야
    Comment commentPostDtoToComment2(CommentDto.Post commentDto);

    Comment commentPutDtoToComment(CommentDto.Put commentDto);

    CommentDto.Response CommentToCommentPutDto(Comment comment);


}







