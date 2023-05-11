package com.main.server.board.service;

import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import com.main.server.board.repository.BoardRepository;
import com.main.server.board.repository.BoardTagRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.tag.entity.Tag;
import com.main.server.tag.repository.TagRepository;
import com.main.server.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.main.server.exception.ExceptionCode;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardTagRepository boardTagRepository;

    private final TagService tagService;

    private final TagRepository tagRepository;


    public Board getBoard(long boardId) {
        return findVerifiedBoard(boardId);
    }

    public Page<Board> getAllBoard(Pageable pageable){
        Page<Board> boards = boardRepository.findAll(pageable);
        return boards;
    }

    public Board putBoard(Board board){
        Board originBoard = findVerifiedBoard(board.getBoardId());
        Optional.ofNullable(board.getContent())
                .ifPresent(contnet->originBoard.setContent(contnet));
        Optional.ofNullable(board.getTitle())
                .ifPresent(title->originBoard.setTitle(title));
        Optional.ofNullable(board.getAddress())
                .ifPresent(address->originBoard.setAddress(address));
        return boardRepository.save(originBoard);
    }

    public void deleteBoard(long boardId){
        boardRepository.delete(findVerifiedBoard(boardId));
    }

    public Board createBoard(Board board) {
//        board.setLike(0L);
//        for(BoardTag x : board.getBoardTag()){
//
//            tagService.createTag(x.getTag());
//        }

        board = boardRepository.save(board);
//        createBoardTag(board);
        return board;
    }

    //    private void createBoardTag(Board board){
//        for(BoardTag x : board.getBoardTag()){
//            x.setBoard(board);
//            x.setTag(tagRepository.findByTagName(x.getTag().getTagName()));
//            boardTagRepository.save(x);
//        }
//    }
    @Transactional(readOnly = true)
    public Board findVerifiedBoard(long answerId) {
        Optional<Board> optionalBoard =
                boardRepository.findById(answerId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }
}