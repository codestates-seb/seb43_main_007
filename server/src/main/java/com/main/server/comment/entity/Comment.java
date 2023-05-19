package com.main.server.comment.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main.server.member.entity.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.sql.Timestamp;
import java.util.Date;
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
//@RequiredArgsConstructor
//@Setter
//@Getter
//@ToString
//@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "comments")
public class
Comment { //엔티티의 역할? 테이블 설계
        @Id //식별자
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "comment_id")
        private Long commentId;

        @Column(name = "content")
        private String content;


        @ManyToOne
        @JoinColumn(name = "member_id")
        private Member member;


        @Column
        private Timestamp createdAt = new Timestamp(new Date().getTime());

        @Column(name = "board_id")
        private Long boardId;

        // @Column(name = "parent_comment_id")
        //  private Integer parentCommentId;  // 부모 댓글 ID

        public Comment(long commentId, String content, Member member, long boardId, long parentCommentId) {
                this.commentId = commentId;
                this.content = content;
                this.member = member;
                this.createdAt = createdAt;
                this.boardId = boardId;
             //   this.parentCommentId = parentCommentId;
        }

}



// 생성자, 게터, 세터 생략


    //보드와 커멘트의 관계는 1:N이다. 댓글이 기준이니깐
   // @ManyToOne(fetch = FetchType.LAZY)
   // @JoinColumn(name = "board_id")
    //private BoardEntity boardEntity;

