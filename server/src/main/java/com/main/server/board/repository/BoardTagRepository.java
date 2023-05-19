package com.main.server.board.repository;

import com.main.server.board.entity.BoardTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface
BoardTagRepository extends JpaRepository<BoardTag, Long> {

}
