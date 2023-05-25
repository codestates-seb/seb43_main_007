package com.main.server.Like.repository;

import com.main.server.Like.entity.Like;
import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import java.util.List;


public interface LikeRepository extends JpaRepository<Like, Long> {

        Optional<Like> findLikeByMemberIdAndBoardId(long memberId, Long boardId); //좋아요 누른사람+게시글
//        Optional<List<Like>> findLikesByMemberId(Long memberId); // 좋아요 누른 멤버 아이디찾기
}
