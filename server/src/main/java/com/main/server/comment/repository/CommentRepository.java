package com.main.server.comment.repository;

import com.main.server.board.entity.Board;
import com.main.server.comment.entity.Comment;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//레포리지토리는 db에 있는 걸 가지고 옴
//엔티티만을 인식할 수 있음
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
  // 보드아이디로 댓글찾기  db에는 entity로 저장되어 있음 이걸 리스트로 묶음
    // boardId에 해당하는 모든 댓글을 가져오는 JPA 쿼리 메서드


   // List<Comment> findByMemberId(long memberId);


    //해당 객체 조회: findId(Long )
    //저장/수정: save(Comment)


}


