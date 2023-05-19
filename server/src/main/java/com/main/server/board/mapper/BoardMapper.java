package com.main.server.board.mapper;

import com.main.server.Like.repository.LikeRepository;
import com.main.server.Like.service.LikeService;
import com.main.server.board.dto.BoardDto;
import com.main.server.board.dto.BoardTagDto;
import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import com.main.server.board.repository.BoardRepository;
import com.main.server.bookmark.repository.BookmarkRepository;
import com.main.server.bookmark.service.BookmarkService;
import com.main.server.member.entity.Member;
import com.main.server.tag.entity.Tag;
import com.main.server.tag.service.TagService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface BoardMapper{
    default Board boardDtoToBoard(BoardDto.Post post){
        Board board = new Board();
        Member member = new Member();
        member.setMemberId(post.getMemberId());
        board.setMember(member);

        List<BoardTag> boardTags = post.getTagNames().stream()
                .map(boardTagDto -> {
                    BoardTag boardTag = new BoardTag();
                    Tag tag = new Tag();
                    tag.setTagName(boardTagDto.getTagName());
                    boardTag.setTag(tag);
                    return boardTag;
                })
                .collect(Collectors.toList());

        board.setCategory(post.getCategory());
        board.setPin(0);
        board.setAddress(post.getAddress());
        board.setTitle( post.getTitle() );
        board.setContent( post.getContent() );
        board.setBoardTag(boardTags);

        return board;
    }

    Board boardPutDtoToBoard(BoardDto.Put boardPutDto);



    default BoardDto.Response boardToBoardResponse(Board response, LikeService likeService, BookmarkService bookmarkService, long userId){
            if ( response == null ) {
                return null;
            }

            String title = null;
            String content = null;
            String address = null;
            LocalDateTime now = null;
            long boardId = 0;
            long memberId = 0;
            String category = null;
            int pin = 0;

            memberId = response.getMember().getMemberId();
            category = response.getCategory();
            boardId = response.getBoardId();
            title = response.getTitle();
            content = response.getContent();
            address = response.getAddress();
            now = response.getNow();
            pin = response.getPin();

            String photo = "http://www.planet-times.com/Files/320/Images/202206/2022060332507773.jpg";
            String nickName = "InGeon";
            String userPhoto = "https://upload.wikimedia.org/wikipedia/ko/thumb/8/81/Spongebob_4795.jpg/345px-Spongebob_4795.jpg";
            int likeCheck = likeService.checkLike(userId,response.getBoardId());

            Long likeCount = response.getLikeCount();

            int bookmark = bookmarkService.checkBookmark( userId , response.getBoardId());

            List<BoardTag> list = response.getBoardTag();
            List<BoardTagDto.Response> responsesTag = new ArrayList<>();
            for(BoardTag x : list){
                responsesTag.add(new BoardTagDto.Response(x.getTag().getTagId(), x.getTag().getTagName()));
            }
            BoardDto.Response response1 = new BoardDto.Response(boardId, memberId, title, content, address, now, photo, bookmark,
                    nickName, userPhoto, category,pin, likeCheck, likeCount, responsesTag );

            return response1;
        }
    }



//    default Board boardDtoToBoard(BoardDto.Post boardDto){
//        Board board = new Board();
//
//
//        board.setTitle(boardDto.getTitle());
//        board.setContent(boardDto.getContent());
//
//
//
//        return board;
//
//    }

    // 태그가 없다면 태그 생성후 키값을 보드태그 테이블에 매핑
    // 태그가 있다면 그 태그의 키값을  보드태그 테이블에 매핑

