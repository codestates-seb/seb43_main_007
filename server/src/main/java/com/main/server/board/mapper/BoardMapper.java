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
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
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
public interface BoardMapper {
    default Board boardDtoToBoard(BoardDto.Post post) {
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
        board.setTitle(post.getTitle());
        board.setContent(post.getContent());
        board.setBoardTag(boardTags);

        return board;
    }

    default  Board boardPutDtoToBoard(BoardDto.Put boardPutDto){
        if ( boardPutDto == null ) {
            return null;
        }

        Board board = new Board();

        board.setBoardId( boardPutDto.getBoardId() );
        board.setTitle( boardPutDto.getTitle() );
        board.setContent( boardPutDto.getContent() );
        board.setAddress( boardPutDto.getAddress() );
        board.setCategory( boardPutDto.getCategory() );

        List<BoardTag> boardTags = boardPutDto.getTagNames().stream()
                .map(boardTagDto -> {
                    BoardTag boardTag = new BoardTag();
                    Tag tag = new Tag();
                    tag.setTagName(boardTagDto.getTagName());
                    boardTag.setTag(tag);
                    return boardTag;
                })
                .collect(Collectors.toList());
        board.setBoardTag(boardTags);

        return board;
    }

    List<BoardDto.Response> pickListToResponse(List<Board> boards);


    default BoardDto.Response boardToBoardResponse(Board response, LikeService likeService, BookmarkService bookmarkService, long userId) {
        if (response == null) {
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
        int pick = 0;

        memberId = response.getMember().getMemberId();
        category = response.getCategory();
        boardId = response.getBoardId();
        title = response.getTitle();
        content = response.getContent();
        address = response.getAddress();
        now = response.getNow();
        pin = response.getPin();
        pick = response.getPick();


        String photo = "";
        int startIndex = content.indexOf("https");
        int endIndex = content.indexOf(".png", startIndex) + 4; // .png까지의 인덱스 + 확장자 길이

        if (startIndex != -1 && endIndex != -1 && endIndex>startIndex) {
            photo = content.substring(startIndex, endIndex);
            System.out.println(photo);
        }else{
            photo = "http://www.planet-times.com/Files/320/Images/202206/2022060332507773.jpg";
        }

        String nickName = response.getMember().getNickname();
        String userPhoto = (response.getMember().getProfileImageUrl() == null) ?
                "https://mainplestory.s3.ap-northeast-2.amazonaws.com/userprofile.png" : response.getMember().getProfileImageUrl();
        int likeCheck = likeService.checkLike(userId, response.getBoardId());

        Long likeCount = response.getLikeCount();

        int bookmark = bookmarkService.checkBookmark(userId, response.getBoardId());

        List<BoardTag> list = response.getBoardTag();
        List<BoardTagDto.Response> responsesTag = new ArrayList<>();
        for (BoardTag x : list) {
            responsesTag.add(new BoardTagDto.Response(x.getTag().getTagId(), x.getTag().getTagName()));
        }
        List<Comment> comments = response.getComments();
        List<CommentDto.Response> commentlist = new ArrayList<>();
        for (Comment c : comments) {
            long parent = (c.getParent() == null) ? 0 : c.getParent().getCommentId();
            commentlist.add(new CommentDto.Response(c.getMember().getNickname(), c.getMember().getProfileImageUrl(),
                    c.getContent(), c.getCreatedAt(), c.getCommentId(), parent));
        }
        BoardDto.Response response1 = new BoardDto.Response(boardId, memberId, title, content, address, now, photo, bookmark,
                nickName, userPhoto, category, pin, likeCheck, likeCount, pick, responsesTag, commentlist);

        return response1;
    }


}





