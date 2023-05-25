package com.main.server.board.repository;

import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface
BoardTagRepository extends JpaRepository<BoardTag, Long> {
    List<BoardTag> findByBoard(Board board);
}
