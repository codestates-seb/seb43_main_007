

package com.main.server.comment.service;

import com.main.server.board.entity.Board;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import com.main.server.comment.mapper.CommentMapper;
import com.main.server.comment.repository.CommentRepository;
import com.main.server.exception.BusinessLogicException;
import com.main.server.member.entity.Member;
import com.main.server.member.service.MemberService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {


    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentMapper commentMapper;

    public CommentService(CommentRepository commentRepository, CommentMapper commentMapper) {//생성자 만들기
        this.commentRepository = commentRepository;
        this.commentMapper = commentMapper;
    }

    public Comment createComment(Comment comment) { //댓글을 생성된걸 받는거

        return commentRepository.save(comment); //컨트롤러로객체반환 받은걸 다시 프론트에 반환

    }

    // 댓글 수정
    //

    //Optional<Comment> comment = commentRepository.findById(reqComment.getCommentId());
    //findById 를 통해 디비에서 댓글을 가져옴
    //Optional 은 만약 디비에 해당 댓글이 없을 경우 orElse() 를 사용해서 null을 넣어줌.
    //comment.orElse(null);

    public Comment updateComment(Comment comment) {
        Optional<Comment> originComment = commentRepository.findById(comment.getCommentId());//아이디 잘못넘어왔으면 널 리턴되는데, 프로그램 멈춤을 막히 위해 옵셔널 오리진가지고 왔고

        Optional.ofNullable(comment.getContent())
                .ifPresent(content->originComment.get().setContent(content));

        return commentRepository.save(originComment.get());
    }


    // 내용 바꿔주기


    //디비에서 에러가 났을때 다시 롤백해주는 기능
    @Transactional
    public void deleteComment(long commentId) {
        //  Optional<Comment> comment = commentRepository.findById(commentId);
        //  commentRepository.delete(comment.get());

        commentRepository.deleteById(commentId);
        //}
    }


}

