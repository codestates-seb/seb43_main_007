package com.main.server.bookmark.entity;

import com.main.server.member.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookmarkId;

    @Column(name = "board_id")
    private Long boardId;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;
}
