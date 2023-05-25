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

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    public void addTag(Tag tag) {
        this.tag = tag;
        if (!this.tag.getBoardTags().contains(this)) {
            this.tag.getBoardTags().add(this);
        }
    }

    public void addBoard(Board board) {
        this.board = board;
        if (!this.board.getBoardTag().contains(this)) {
            this.board.getBoardTag().add(this);
        }
    }
}
