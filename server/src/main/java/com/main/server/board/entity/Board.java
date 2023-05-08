package com.main.server.board.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(new Date().getTime());


//    private Long like;

//    @OneToMany(mappedBy = "board")
//    private List<BoardTag> boardTag = new ArrayList<>();



}
