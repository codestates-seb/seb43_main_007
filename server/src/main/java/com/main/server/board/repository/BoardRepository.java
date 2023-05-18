package com.main.server.board.repository;


import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.OrderBy;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Page<Board> findAllByOrderByPinDescBoardIdDesc(Pageable pageable);

    Page<Board> findByCategoryContaining(String cate, Pageable pageable);

    Page<Board> findByCategoryAndTitleContaining(String cate, String title, Pageable pageable);
    Page<Board> findByCategoryAndContentContaining(String cate, String content, Pageable pageable);
    Page<Board> findByCategoryAndContentOrTitleContaining(String cate, String content, String title,Pageable pageable);


    Page<Board> findByCategoryOrTitleContaining(String cate, String title, Pageable pageable);
    Page<Board> findByCategoryOrContentContaining(String cate, String content, Pageable pageable);
    Page<Board> findByCategoryOrContentOrTitleContaining(String cate, String content, String title,Pageable pageable);
    Page<Board> findByContentContaining(String content, Pageable pageable);

    // pin을 기준으로 우선순위 내림차순 같다면 boardId를 기준으로 내림차순
}
