package com.main.server.board.entity;

import com.main.server.member.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @Column()
    private String address;

    @Column(nullable = false)
    private LocalDateTime now = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "member_Id")
    private Member member;


//    private Long like;

    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<BoardTag> boardTag = new ArrayList<>();



}
