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



    }



