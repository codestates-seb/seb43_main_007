package com.main.server.bookmark.service;

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
    public int updateBookmark(BookmarkDto bookmarkDto) {
        Optional<Member> member = memberRepository.findById(bookmarkDto.getMemberId());
        if(member.isPresent()){
            Optional<Bookmark> bookmark = bookmarkRepository.findByMemberAndBoardId(member.get(), bookmarkDto.getBoardId());
            if(bookmark.isPresent()){
                bookmarkRepository.delete(bookmark.get());
                return 0;
            }else{
                Bookmark bookmarkDB = new Bookmark();
                bookmarkDB.setBoardId(bookmarkDto.getBoardId());
                bookmarkDB.setMember(member.get());
                bookmarkRepository.save(bookmarkDB);
                return 1;
            }
        }
        return 0;

    }
}
