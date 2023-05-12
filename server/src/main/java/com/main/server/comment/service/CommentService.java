package com.main.server.comment.service;

import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import com.main.server.comment.mapper.CommentMapper;
import com.main.server.comment.repository.CommentRepository;
import com.main.server.exception.BusinessLogicException;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;
@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
@Service
public class CommentService {


    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentMapper commentMapper;


    //   public CommentService(CommentRepository commentRepository) {//생성자 만들기
    //        this.commentRepository = commentRepository;
    //    }
   public void createComment(CommentDto.Post reqComment){
       Comment comment = new Comment();
       comment.setContent(reqComment.getContent());
       comment.setMemberId(reqComment.getMemberId());

       commentRepository.save(comment);
   }

    // 댓글 수정
    public void updateComment(CommentDto.Put reqComment){
        Optional<Comment> comment = commentRepository.findById(reqComment.getCommentId());
        //findById 를 통해 디비에서 댓글을 가져옴
        //Optional 은 만약 디비에 해당 댓글이 없을 경우 orElse() 를 사용해서 null을 넣어줌.
        comment.orElse(null);

        // 내용 바꿔주기
        comment.get().setContent(reqComment.getContent());

        // Comment엔티티가 Optional 타입이기 때문에 get()을 통해 가져온다.
        commentRepository.save(comment.get());
    }

    //디비에서 에러가 났을때 다시 롤백해주는 기능
    @Transactional
    public void deleteComment(long commentId) {
      //  Optional<Comment> comment = commentRepository.findById(commentId);
      //  commentRepository.delete(comment.get());

           commentRepository.deleteById(commentId);
        //}
    }


}


