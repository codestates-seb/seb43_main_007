package com.main.server.comment.mapper;

import com.main.server.board.entity.Board;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.Setter;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    // default Comment commentDtoToComment(CommentDto.Post commentDto){
    default CommentDto.Response commentToCommentPostDto(Comment comment) {
       CommentDto.Response response = new CommentDto.Response();

       response.setNickname(comment.getMember().getNickname());
       response.setUserPhoto(comment.getMember().getProfileImageUrl());
       response.setCommentId(comment.getCommentId());
       response.setContent(comment.getContent());
       response.setCreatedAt(comment.getCreatedAt());
       if(comment.getParent()==null) response.setParentId(0L);
       else response.setParentId(comment.getParent().getCommentId());
       return response;
    }

    //엔티티를 디티오로 변환할꺼야
    default Comment commentPostDtoToComment2(CommentDto.Post commentDto, MemberRepository memberRepository) {
        Comment comment = new Comment();
        Member member = new Member();
        Board board = new Board();
        Comment parent = new Comment();
        if(commentDto.getParentId()!=0) {
            parent.setCommentId(commentDto.getParentId());
            comment.setParent(parent);
        }
        

        board.setBoardId(commentDto.getBoardId());
        member.setMemberId(commentDto.getMemberId());
        Member memberDB = memberRepository.findById(commentDto.getMemberId()).get();
        String nickName  = memberDB.getNickname();
        String userPhoto =  (memberDB.getProfileImageUrl()==null)?
                "https://mainplestory.s3.ap-northeast-2.amazonaws.com/userprofile.png":memberDB.getProfileImageUrl();
        member.setNickname(nickName);
        member.setProfileImageUrl(userPhoto);

        comment.setBoard(board);
        comment.setContent(commentDto.getContent());
        comment.setMember(member);


        return comment;
    }

    Comment commentPutDtoToComment(CommentDto.Put commentDto);

    CommentDto.Response CommentToCommentPutDto(Comment comment);

    CommentDto.Response CommentToCommentResponseDto(Comment comment);


    default CommentDto.MyPageResponse commentToCommentMyPageDto(Comment comment) {
        CommentDto.MyPageResponse myPageResponse = new CommentDto.MyPageResponse();
        myPageResponse.setBoardId(comment.getBoard().getBoardId());
        myPageResponse.setContent(comment.getContent());

        return myPageResponse;
    }


}







