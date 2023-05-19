package com.main.server.Like.service;

import com.main.server.Like.dto.LikeDto;
import com.main.server.Like.entity.Like;
import com.main.server.Like.repository.LikeRepository;
import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.bookmark.entity.Bookmark;
import com.main.server.member.dto.MemberDto;
import com.main.server.member.entity.Member;
import com.main.server.member.mapper.MemberMapper;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final BoardRepository boardRepository;


    public long like(LikeDto likeDto) {

        Like like = new Like(); //라이크에, 멤버아이디&보드아이디 넣기
        like.setMemberId(likeDto.getMemberId());
        like.setBoardId(likeDto.getBoardId());
        Optional<Board> board = boardRepository.findByBoardId(likeDto.getBoardId()); // 보드아이디저장 > 엔티티값


        Board originBoard = board.get(); //좋아요 눌린 원게시글

        long likeCount = originBoard.getLikeCount() + 1;  //라이크가 올라가는 메서드 > 원게시글의 라이크카운트에 +1해주기
        originBoard.setLikeCount(likeCount); //+1이된 라이크값을 업데이트
        likeRepository.save(like); //업데이트 된 라이크값 저장 > 엔티티 값
        boardRepository.save(originBoard); //원게시글 업데이트 값으로 저장


        return likeCount;

    }


    public long unlike(LikeDto likeDto) { //삭제를 하는데 필요한건 라이크만 삭제하면 됨

        Optional<Board> board = boardRepository.findByBoardId(likeDto.getBoardId());
        Optional<Like> like = likeRepository.findLikeByMemberIdAndBoardId(likeDto.getMemberId(), likeDto.getBoardId());
        Board originBoard = board.get();

        originBoard.setLikeCount(originBoard.getLikeCount() - 1);
        boardRepository.save(originBoard);

        if (like.isPresent()) {
            likeRepository.delete(like.get());
            return originBoard.getLikeCount(); //라이크카운트 리턴
        }
      return 0;//
    }

    public int checkLike(long memberId, long boardId){
        Optional<Like> like = likeRepository.findLikeByMemberIdAndBoardId(memberId, boardId);
        return like.isPresent() ? 1 : 0;
    }
}





