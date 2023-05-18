package com.main.server.board.service;

import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import com.main.server.board.repository.BoardRepository;
import com.main.server.board.repository.BoardTagRepository;
import com.main.server.bookmark.entity.Bookmark;
import com.main.server.bookmark.repository.BookmarkRepository;
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

    private final TagService tagService;

    private final TagRepository tagRepository;

    private final MemberRepository memberRepository;
    private final BookmarkRepository bookmarkRepository;
    public Board getBoard(long boardId) {


        return findVerifiedBoard(boardId);
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

    public Page<Board> getAllBoard(Pageable pageable, String cate, String title, String content, long memberId) {

        Page<Board> boards = boardRepository.findAllByOrderByPinDescBoardIdDesc(pageable);
        if(!cate.equals("") && (!title.equals("") && !content.equals(""))) { // 타이틀+컨텐츠 검색
            Page<Board> filteredBoards = boards.stream()
                    .filter(board -> board.getCategory().equals(cate))
                    .filter(board -> board.getTitle().contains(title) || board.getContent().contains(content))
                    .peek(board -> board.setBookmark(checkBookmark(memberId, board.getBoardId())))
                    .collect(Collectors.collectingAndThen(Collectors.toList(),
                            list -> new PageImpl<>(list, pageable, boards.getTotalElements())));
            return filteredBoards;
        }else if(!cate.equals("")) { // 타이틀 or 컨텐츠 검색
            Page<Board> filteredBoards = boards.stream()
                    .filter(board -> board.getCategory().equals(cate))
                    .filter(board -> board.getTitle().contains(title))
                    .filter(board -> board.getContent().contains(content))
                    .peek(board -> board.setBookmark(checkBookmark(memberId, board.getBoardId())))
                    .collect(Collectors.collectingAndThen(Collectors.toList(),
                            list -> new PageImpl<>(list, pageable, boards.getTotalElements())));
            return filteredBoards;
        }else{ // Nav바 타이틀+컨텐츠 검색
            Page<Board> filteredBoards = boards.stream()
                    .filter(board -> board.getTitle().contains(title) || board.getContent().contains(content))
                    .peek(board -> board.setBookmark(checkBookmark(memberId, board.getBoardId())))
                    .collect(Collectors.collectingAndThen(Collectors.toList(),
                            list -> new PageImpl<>(list, pageable, boards.getTotalElements())));
            return filteredBoards;

        }
//        return boards;
    }

    public Board putBoard(Board board) {
        Board originBoard = findVerifiedBoard(board.getBoardId());
        Optional.ofNullable(board.getContent())
                .ifPresent(contnet -> originBoard.setContent(contnet));
        Optional.ofNullable(board.getTitle())
                .ifPresent(title -> originBoard.setTitle(title));
        Optional.ofNullable(board.getAddress())
                .ifPresent(address -> originBoard.setAddress(address));
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
                boardDB.setPin(1);
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
}
