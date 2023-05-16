package com.main.server.Like.entity;

import com.main.server.board.entity.Board;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "likes")
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "board_id")
    private Long boardId;

    // 추가 필드 및 메소드 생략//
//@Entity
//@Table(name = "heart")
//@Getter
//@Setter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//public class Heart {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
//    private Long id;
//
//    @Column(name = "campaign_id")
//    @NonNull
//    private String campaignId;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id")
//    @JsonIgnore
//    private User user;
//}

    }



