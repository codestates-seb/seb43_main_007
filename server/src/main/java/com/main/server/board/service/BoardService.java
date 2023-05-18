package com.main.server.board.service;

import com.main.server.Like.entity.Like;
import com.main.server.Like.repository.LikeRepository;
import com.main.server.board.entity.Board;
import com.main.server.board.entity.BoardTag;
import com.main.server.board.repository.BoardRepository;
import com.main.server.board.repository.BoardTagRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import com.main.server.tag.entity.Tag;
import com.main.server.tag.repository.TagRepository;
import com.main.server.tag.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

    private final TagService tagService;

    private final TagRepository tagRepository;


    public Board getBoard(long boardId) {


        return findVerifiedBoard(boardId);
    }

    public Page<Board> getAllBoard(Pageable pageable) {
        Page<Board> boards = boardRepository.findAll(pageable);
        List<Board> updatedBoards = boards.getContent().stream().map(board -> c(board)).collect(Collectors.toList());
        return new PageImpl<>(updatedBoards, pageable, boards.getTotalElements());
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
