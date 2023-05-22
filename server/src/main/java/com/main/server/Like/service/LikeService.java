package com.main.server.Like.service;

import com.main.server.Like.dto.LikeDto;
import com.main.server.Like.entity.Like;
import com.main.server.Like.repository.LikeRepository;
import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.bookmark.dto.BookmarkDto;
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


    public long updateLike(LikeDto likeDto) {

        Optional<Like> like = likeRepository.findLikeByMemberIdAndBoardId(likeDto.getMemberId(), likeDto.getBoardId());
        if (like.isPresent()) {
            likeRepository.delete(like.get());
            return boardSave(likeDto.getBoardId(), 0);
        } else {
            Like likeDB = new Like();
            likeDB.setBoardId(likeDto.getBoardId());
            likeDB.setMemberId(likeDto.getMemberId());
            likeRepository.save(likeDB);
            return boardSave(likeDB.getBoardId(), 1);
        }
    }

    public long boardSave(long boardId, int num) {
        Optional<Board> board = boardRepository.findById(boardId);
        if (board.isPresent()) {
            Board boardDB = board.get();
            boardDB.setLikeCheck(num);
            long likeCount = (num==1)?boardDB.getLikeCount()+num : boardDB.getLikeCount()-1 ;
            boardDB.setLikeCount(likeCount);
            boardRepository.save(boardDB);
            return likeCount;
        }
        return 0;
    }


    public int checkLike(long memberId, long boardId) {
        Optional<Like> like = likeRepository.findLikeByMemberIdAndBoardId(memberId, boardId);
        return like.isPresent() ? 1 : 0;
    }
}





