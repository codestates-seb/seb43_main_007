package com.main.server.board.repository;


import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
