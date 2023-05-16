package com.main.server.Like.service;

import com.main.server.Like.dto.LikeDto;
import com.main.server.Like.entity.Like;
import com.main.server.Like.repository.LikeRepository;
import com.main.server.board.entity.Board;
import com.main.server.board.repository.BoardRepository;
import com.main.server.member.dto.MemberDto;
import com.main.server.member.entity.Member;
import com.main.server.member.mapper.MemberMapper;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

//patch 요청 받으면 먼저 디비에 넘어온 값이 있나없나 체크하고 없으면 save, 있으면 delete 작업  > 키고 끄고 둘다,, 만약, 불이 꺼져있는데 누르고 싶어 불이 켜져 있는데 끄고 싶어
@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final BoardRepository boardRepository;


    public long like(LikeDto likeDto) {


        Like like = new Like();
        like.setMemberId(likeDto.getMemberId());
        like.setBoardId(likeDto.getBoardId());
        Optional<Board> board = boardRepository.findByBoardId(likeDto.getBoardId());


        Board originBoard = board.get();

        long likeCount = originBoard.getLikeCount() + 1;
        originBoard.setLikeCount(likeCount);
        likeRepository.save(like);
        boardRepository.save(originBoard);


        return likeCount;

    }


        //보드 게시글에 있는 라이크 값 수정
      //  Board originBoard = board.get();
    //    public long unlike(LikeDto likeDto) {

   //   Optional<Board> board = boardRepository.findByBoardId(likeDto.getBoardId());
   //  Optional<Like> like = likeRepository.findLikeByMemberIdAndBoardId(likeDto.getMemberId(), likeDto.getBoardId());

    //   if(like.isPresent()){ //만약에 이게 존재하지 않는다면?
    //      likeRepository.delete(like.get());
     //     return likeDto.getBoardId();
     //    } else {

      //  if (board.isPresent()) {
      //     Board originBoard = board.get();
        // originBoard.setLikeCount(originBoard.getLikeCount() - 1);
     //    boardRepository

     //               .save(originBoard);
        }
    //}


   // long likeCount = originBoard.getLikeCount() - 1;
    //    originBoard.setLikeCount(likeCount);
     //   boardRepository.save(originBoard);


     //   return likeCount;






//
//   public long unLike(LikeDto likeDto) {
//        validateToken(likeDto, jwtToken);
//
//        Optional<Like> likeOpt = findLikeWithMemberAndboardId(likeDto);
//
//        if (likeOpt.isEmpty()) {
//            throw new CustomException(Like_NOT_FOUND);
//        }
//
//        likeRepository.delete(likeOpt.get());
//
//        updateLikeCount(likeDto.getBoardId(), -1);
//    }
//
//    //public void validateToken(HeartDto heartDto, String jwtToken) {
//        // 유효한 토큰인지 검증
//        //if (!jwtTokenProvider.validateToken(jwtToken)) {
//           // throw new CustomException(INVALID_JWT_TOKEN);
//       // }
//
//        // 해당 유저 존재하는지 검증
//        Optional<Member> memberOpt = memberRepository.findmemberById(likeDto.getMemberId());
//        if (memberOpt.isEmpty()) {
//            throw new CustomException(MEMBER_NOT_FOUND);
//        } else {
//            member = memberOpt.get();
//        }
//
//        // 토큰 정보와 요청 userId 정보가 같은지 검증
//        if (!jwtTokenProvider.getUserPk(jwtToken).equals(memberOpt.get().getEmail())) {
//            throw new CustomException(MISMATCH_JWT_USER);
//        }
//    }
//
//    public Optional<Like> findLikeWithMemberAndBoardId(LikeDto likeDto) { //좋아요를 누른사람들은 게시글 아이디 멤버아이디
//        return LikeRepository
//                .findLikeByMemberAndBoardId(member, likeDto.getBoardId());
//    }
//
//    public void updateLikeCount(String boardId, Integer plusOrMinus) throws IOException {
//
//        Optional<Board> boardOpt = boardRepository.findById(boardId);
//        if (boardOpt.isEmpty()) {
//            throw new CustomException(BOARD_NOT_FOUND);
//        }
//
//        UpdateRequest request = new UpdateRequest("boards", boardId)
//                .doc("like_count", boardOpt.get().getBoardCount() + plusOrMinus);
//
//        UpdateResponse response = elasticsearchClient.update(request, RequestOptions.DEFAULT);
//        log.info("ES boardCount update response = {}", response);
//    }



