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
    // pin을 기준으로 우선순위 내림차순 같다면 boardId를 기준으로 내림차순
}
