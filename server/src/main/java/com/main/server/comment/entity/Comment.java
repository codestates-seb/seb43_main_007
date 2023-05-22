package com.main.server.comment.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.main.server.member.entity.Member;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
 //   @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
  //  private List<Comment> comments = new ArrayList<>();
    private Long boardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(mappedBy = "parent", cascade = CascadeType.REMOVE)
    private List<Comment> children = new ArrayList<>();



    public Comment(Long commentId, String content, Member member, Long boardId, Comment parent) {
        this.commentId = commentId;
        this.content = content;
        this.member = member;
        this.boardId = boardId;
        this.parent = parent;
    }


}



// 생성자, 게터, 세터 생략


    //보드와 커멘트의 관계는 1:N이다. 댓글이 기준이니깐
   // @ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "board_id")
    //private BoardEntity boardEntity;

