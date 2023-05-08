package com.main.server.board.entity;

import com.main.server.tag.entity.Tag;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class BoardTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardTagId;

//    @ManyToOne
//    @JoinColumn(name = "BOARD_ID")
//    private Board board;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;
}
