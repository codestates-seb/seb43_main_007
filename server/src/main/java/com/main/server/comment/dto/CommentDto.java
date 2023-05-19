package com.main.server.comment.dto;


import lombok.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.sql.Timestamp;
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
    private Timestamp createdAt;  //등록일
    private long boardId;
    private long parentCommentId;


    @Getter
    @Setter
    public  static class Post {
        private String content;
        private Long memberId; //멤버를 식별하기 위함
        private Long boardId;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Put {

        @Length(min = 3, message = "내용은 3자 이상 작성하셔야 합니다.")
        private String content;

        private Long commentId;

    }

    @Getter @Setter
    @AllArgsConstructor
    public static class   Response { //닉네임,사진 추가
        private String content;
        private Timestamp createdAt;

    }


    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class   MyPageResponse { //마이페이지 겟요청할때 필요. 보드아이디는 보드 찾아들어갈것, 내용은 보여줄것
        private Long boardId;
        private String content;

    }

}






