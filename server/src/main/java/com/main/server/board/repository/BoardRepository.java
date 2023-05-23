package com.main.server.board.repository;


import com.main.server.board.entity.Board;
import com.main.server.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.OrderBy;
import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {

    List<Board> findAllByPick(int pickNum);
    @Query("SELECT b FROM Board b JOIN b.boardTag bt JOIN bt.tag t WHERE t.tagName LIKE %:tagName%")
    Page<Board> findByTagNameContaining(@Param("tagName") String tagName, Pageable pageable);
    List<Board> findAllByPin(int pinNum);
    Page<Board> findAllByOrderByPinDescBoardIdDesc(Pageable pageable);

    Page<Board> findByCategoryContaining(String cate, Pageable pageable);

    Page<Board> findByCategoryAndTitleContaining(String cate, String title, Pageable pageable);
    Page<Board> findByCategoryAndContentContaining(String cate, String content, Pageable pageable);

    @Query("SELECT b FROM Board b WHERE category=:cate AND title Like '%:title%' or content Like '%:content%' ")
    Page<Board> findByCategoryAndContentContainingOrTitleContaining(@Param("cate") String cate, @Param("content") String content, @Param("title") String title, Pageable pageable);


    Page<Board> findByTitleContaining(String title, Pageable pageable);
    Page<Board> findByOrContentContaining( String content, Pageable pageable);
    Page<Board> findByContentContainingOrTitleContaining(String content, String title,Pageable pageable);
    Page<Board> findByContentContaining(String content, Pageable pageable);
    Optional<Board> findByBoardId(long boardId);

    // pin을 기준으로 우선순위 내림차순 같다면 boardId를 기준으로 내림차순
}
