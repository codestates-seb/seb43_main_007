package com.main.server.board.service;

import com.main.server.Like.entity.Like;
import com.main.server.Like.repository.LikeRepository;
import com.main.server.Like.service.LikeService;
import com.main.server.auth.mail.MailService;
import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import com.main.server.board.repository.BoardRepository;
import com.main.server.board.repository.BoardTagRepository;
import com.main.server.bookmark.entity.Bookmark;
import com.main.server.bookmark.repository.BookmarkRepository;
import com.main.server.bookmark.service.BookmarkService;
import com.main.server.exception.BusinessLogicException;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import com.main.server.member.service.MemberService;
import com.main.server.tag.entity.Tag;
import com.main.server.tag.repository.TagRepository;
import com.main.server.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.main.server.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardTagRepository boardTagRepository;
    private final LikeRepository likeRepository;
    private final LikeService likeService;

    private final BookmarkService bookmarkService;

    private final TagService tagService;

    private final TagRepository tagRepository;

    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;

    private final MailService mailService;
    public Board getBoard(long boardId) {


        return findVerifiedBoard(boardId);
    }

    public Page<Board> getAllTag(Pageable pageable, String tagName){
        return boardRepository.findByTagNameContaining(tagName, pageable);
    }
    public Page<Board> getAllBoard(Pageable pageable, String cate, String title, String content, long memberId) {

        Page<Board> boards = boardRepository.findAllByOrderByPinDescBoardIdDesc(pageable);
        if(!cate.equals("")) { //카테고리만 입력
            if(title.equals("") && content.equals("")){
                Page<Board> filteredBoards1 = boardRepository.findByCategoryContaining(cate, pageable); // 카테 리스트
                Page<Board> b = new PageImpl<>(filteredBoards1.toList(), pageable, filteredBoards1.getTotalElements());

                return b;
            }else if(!title.equals("") && content.equals("")) { // 카테고리+제목
                Page<Board> filteredBoards2 = boardRepository.findByCategoryAndTitleContaining(cate, title, pageable);
                Page<Board> b = new PageImpl<>(filteredBoards2.toList(), pageable, filteredBoards2.getTotalElements());
                return b;
            }else if(title.equals("") && !content.equals("")){ //카테고리+컨텐츠
                Page<Board> filteredBoards3 = boardRepository.findByCategoryAndContentContaining(cate, content, pageable);
                Page<Board> b = new PageImpl<>(filteredBoards3.toList(), pageable, filteredBoards3.getTotalElements());
                return b;
            }else{ //카테고리 + 컨텐츠 + 제목
                Page<Board> filteredBoards4 = boardRepository.findByCategoryAndContentContainingOrTitleContaining(cate, content,title, pageable);
                Page<Board> b = new PageImpl<>(filteredBoards4.toList(), pageable, filteredBoards4.getTotalElements());
                return b;
            }
        }else{
            if(title.equals("") && content.equals("")){ // 전체게시글
                Page<Board> b = new PageImpl<>(boards.toList(), pageable, boards.getTotalElements());
                return b;
            }else if(!title.equals("") && content.equals("")) { //제목
                Page<Board> filteredBoards2 = boardRepository.findByTitleContaining(title, pageable);
                Page<Board> b = new PageImpl<>(filteredBoards2.toList(), pageable, filteredBoards2.getTotalElements());
                return b;
            }else if(title.equals("") && !content.equals("")){ //컨텐츠
                Page<Board> filteredBoards3 = boardRepository.findByContentContaining( content, pageable);
                Page<Board> b = new PageImpl<>(filteredBoards3.toList(), pageable, filteredBoards3.getTotalElements());
                return b;
            }else{ //컨텐츠 + 제목
                Page<Board> filteredBoards4 = boardRepository.findByContentContainingOrTitleContaining(content,title, pageable);
                Page<Board> b = new PageImpl<>(filteredBoards4.toList(), pageable, filteredBoards4.getTotalElements());
                return b;
            }

        }
//        return boards;
    }

    public void checkLikeBookmark(){

    }

    public List<Board> getPickList(){
        List<Board> pickList = boardRepository.findAllByPick(1);
        return pickList;
    }

    public Board putBoard(Board board) {
        Board originBoard = findVerifiedBoard(board.getBoardId());
        Optional.ofNullable(board.getContent())
                .ifPresent(contnet -> originBoard.setContent(contnet));
        Optional.ofNullable(board.getTitle())
                .ifPresent(title -> originBoard.setTitle(title));
        Optional.ofNullable(board.getAddress())
                .ifPresent(address -> originBoard.setAddress(address));
        Optional.ofNullable(board.getCategory())
                .ifPresent(category-> originBoard.setCategory(category));
        return boardRepository.save(originBoard);
    }
    public void cretatePin(long boardId) {
        Optional<Board> board = boardRepository.findById(boardId);
        if(board.isPresent()) {
            Board boardDB = board.get();
            if(boardDB.getPin()==1) {
                boardDB.setPin(0);
            }
            else {
                pinCheck(); // pin이 3개이상이면 하나를 지운다.
                boardDB.setPin(1);
            }
            boardRepository.save(boardDB);
        }
    }

    public void createPick(long boardId){
        Optional<Board> board = boardRepository.findById(boardId);
        if(board.isPresent()) {
            Board boardDB = board.get();
            if(boardDB.getPick()==1) {
                boardDB.setPick(0);
            } else {
                Optional<Member> member = memberRepository.findById(1L);
                String email = boardDB.getMember().getEmail();
                if(member.isPresent()) boardDB.setMember(member.get());
                mailService.sendEmail(email, "에디터 게시글에 선정되었습니다! 축하합니다.", "축하");
                boardDB.setPick(1);
            }
            boardRepository.save(boardDB);
        }
    }

    public void deleteBoard(long boardId) {
        boardRepository.delete(findVerifiedBoard(boardId));
    }

    public Board createBoard(Board board) {
        for (BoardTag boardTag : board.getBoardTag()) {
            boardTag.setBoard(board);
        }

        putInformationForTag(board);
        board.setLikeCount(0L);
        return boardRepository.save(board);
    }

    @Transactional(readOnly = true)
    public Board findVerifiedBoard(long answerId) {
        Optional<Board> optionalBoard =
                boardRepository.findById(answerId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }

    public void pinCheck(){
        List<Board> boards = boardRepository.findAllByPin(1);
        if(boards.size()==3){
            Board board = boards.get(0);
            board.setPin(0);
            boardRepository.save(board);
        }

    }



    private void putInformationForTag(Board board) {

        List<BoardTag> boardTags = board.getBoardTag();

        List<BoardTag> boardTagList = boardTags.stream()
                .map(boardTag -> {
                    Tag tag;
                    Optional<Tag> optionalTag = tagRepository.findByTagName(boardTag.getTag().getTagName());
                    if (optionalTag.isEmpty()) {
                        tag = tagRepository.save(boardTag.getTag());
                    } else {
                        tag = optionalTag.get();
                        boardTag.setTag(tag);
                    }
                    tag.addBoardTag(boardTag);
                    return boardTag;
                })
                .collect(Collectors.toList());

        boardTags.stream()
                .map(boardTagRepository::save)
                .collect(Collectors.toList());

        board.setBoardTag(boardTagList);
    }
    public Board c(Board board) {
        long memberId = 1;
        long boardId = board.getBoardId();

        Optional<Like> like = likeRepository.findLikeByMemberIdAndBoardId(memberId, boardId);
        if (like.isPresent()) {
            board.setLikeCheck(1);
        }else{
        board.setLikeCheck(0);
    }

        return board;

    }
}
