package com.main.server.comment.mapper;

import com.main.server.board.entity.Board;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import com.main.server.member.entity.Member;
import lombok.Setter;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

   // default Comment commentDtoToComment(CommentDto.Post commentDto){
   CommentDto.Response commentToCommentPostDto(Comment comment);
    //엔티티를 디티오로 변환할꺼야
    default Comment commentPostDtoToComment2(CommentDto.Post commentDto) {
        Comment comment = new Comment();
        Member member = new Member();

        member.setMemberId(commentDto.getMemberId());

        comment.setBoardId(commentDto.getBoardId());


        comment.setContent(commentDto.getContent());
        comment.setMember(member);

        return comment;
    }

    Comment commentPutDtoToComment(CommentDto.Put commentDto);

    CommentDto.Response CommentToCommentPutDto(Comment comment);

    CommentDto.Response CommentToCommentResponseDto(Comment comment);


    default CommentDto.MyPageResponse commentToCommentMyPageDto(Comment comment) {
        CommentDto.MyPageResponse myPageResponse = new CommentDto.MyPageResponse();
        myPageResponse.setBoardId(comment.getBoardId());
        myPageResponse.setContent(comment.getContent());

        return myPageResponse;
    }


}







