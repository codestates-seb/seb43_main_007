package com.main.server.comment.controller;

import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import com.main.server.comment.mapper.CommentMapper;
import com.main.server.comment.service.CommentService;
import com.main.server.utils.UriCreator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;


@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private CommentMapper commentMapper;

    // 댓글 추가 API


    // 댓글 목록 가져오기 API
    //1.보드 아이디로 DB에서 꺼내와야 해
    //2.그걸 처리하려면 service에서 레포지토리에 접근해서 리스트 반환
    //3.컨트롤러에서 서비스.보드아이디를 가지고 온다
    //4. 그리고 commentList로 반환해줌
    //5. 리턴값은 뭐지,,
    //@GetMapping("/{boardId}") //프론트와 소통하는 형식 ResponseEntity>json형식으로 받음 //성공인지 아닌지도 보내주는거 어떻게 보내고 있는지 확인해보기
    //public ResponseEntity<List<Comment>> getCommentsByBoardId(@PathVariable long boardId) {//엔티티 디티오를 특정지거줌<>
    // List<Comment> commentList = commentService.getCommentsByBoardId(boardId);
    //  return ResponseEntity.ok(commentList);
    @PostMapping //댓글등록,,,, db에 등록
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post commentPostDto) {
        try {
            commentService.createComment(commentPostDto);
            URI location = UriCreator.createUri("/comments");
            return ResponseEntity.created(location).build();
                    }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
                   }


    }

    // 프론트에서 request 한 값들을 받아온다 (comment-id와 content)
    @PutMapping("/{comment-id}")  //수정요청
    public ResponseEntity putComment(@PathVariable("comment-id") @Positive long commentId, @Valid @RequestBody CommentDto.Put reqComment) {
        URI location =  null;
        try{
            reqComment.setCommentId(commentId);
            commentService.updateComment(reqComment);
            //ResponseEntity req = new ResponseEntity<>(CommentMapper.commentToCommentResponse(response), HttpStatus.OK);

            // /comments/{comment-id}
            location = UriCreator.createUri("/comments", commentId);
            return ResponseEntity.created(location).build();
        }catch(Exception e){
            // ResponseEntity status 타입
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{comment-id")
    public ResponseEntity deleteComment(@PathVariable("comment-id") @Positive long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}


