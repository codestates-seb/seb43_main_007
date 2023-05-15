package com.main.server.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDateTime;
import java.util.Date;

//        commentId	INT
//        content	VARCHAR(45)
//        createdAt	DATETIME
//        memberId	INT
  //      boardId	INT
@Getter @Setter
@AllArgsConstructor
public class CommentDto { //서비스는 엔티티에서 받아온 애를 직접 가공x, 서비스는 데이터 dto로 옮겨서
    private long commentId; //댓글식별자  자동으로 생성이 되는거여서 필요없음
    private String content; //댓글내용
    private long memberId; //댓글작성자 그 회원의 진짜 아이디 닉네임이 안필요 누가 썼는지 뭐라고 썼는지 어느 게시글에서 썼는지
    private LocalDateTime createdAt;  //등록일
    private long boardId;
    private long parentCommentId;


    @Data
    public static class Post {
        private String content;
        private Long memberId;
        private LocalDateTime createdAt;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Put {

        @Length(min = 10, message = "내용은 10자 이상 작성하셔야 합니다.")
        private String content;

        private Long commentId;

        //todo. JPA LocalDateTime 자동 Update
        private LocalDateTime createdAt;


    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private String content;
        private LocalDateTime createdAt;

    }
}






