package com.main.server.bookmark.service;

import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.bookmark.dto.BookmarkDto;
import com.main.server.bookmark.entity.Bookmark;
import com.main.server.bookmark.repository.BookmarkRepository;
import com.main.server.comment.entity.Comment;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final MemberRepository memberRepository;
    private final BoardRepository boardRepository;
    public int updateBookmark(BookmarkDto bookmarkDto) {
        Optional<Member> member = memberRepository.findById(bookmarkDto.getMemberId());
        if(member.isPresent()){
            Optional<Bookmark> bookmark = bookmarkRepository.findByMemberAndBoardId(member.get(), bookmarkDto.getBoardId());
            if(bookmark.isPresent()){
                bookmarkRepository.delete(bookmark.get());
                boardSave(bookmarkDto.getBoardId(), 0);
                return 0;
            }else{
                Bookmark bookmarkDB = new Bookmark();
                bookmarkDB.setBoardId(bookmarkDto.getBoardId());
                bookmarkDB.setMember(member.get());
                bookmarkRepository.save(bookmarkDB);
                boardSave(bookmarkDto.getBoardId(), 1);
                return 1;
            }
        }
        return 0;
    }
    public void boardSave(long boardId, int num){
        Optional<Board> board = boardRepository.findById(boardId);
        if(board.isPresent()){
            Board boardDB = board.get();
            boardDB.setBookmark(num);
            boardRepository.save(boardDB);
        }
    }

    public int checkBookmark(long memberId, long boardId){
        Optional<Member> member = memberRepository.findById(memberId);
        if(member.isPresent()){
            Optional<Bookmark> bookmark = bookmarkRepository.findByMemberAndBoardId(member.get(), boardId);
            if(bookmark.isPresent()){
                return 1;
            }else{
                return 0;
            }
        }
        return 0;
    }


}
