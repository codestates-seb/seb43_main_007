package com.main.server.board.dto;

import com.main.server.board.entity.BoardTag;
import com.main.server.comment.dto.CommentDto;
import com.main.server.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardDto {

    @Getter
    @AllArgsConstructor
    public static class Post{
        private long memberId;

        @NotEmpty(message = "제목을 작성해 주세요.")
        private String title;
        @NotEmpty(message = "내용을 작성해 주세요.")
        @Length(min = 10, message = "내용은 10자 이상 작성하셔야 합니다.")
        private String content;

        private String address;

        private String category;

        private List<BoardTagDto.Add> tagNames;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Put{
        private Long memberId;
        private Long boardId;
        @NotEmpty(message = "제목을 작성해 주세요.")
        private String title;
        @NotEmpty(message = "내용을 작성해 주세요.")
        @Length(min = 10, message = "내용은 10자 이상 작성하셔야 합니다.")
        private String content;

        private String category;

        private String address;
//        private List<Tag> tags;

    }

    @Getter
    @AllArgsConstructor
    public static class Response{

        private Long boardId;

        private Long memberId;
        private String title;
        private String content;
        private String address;
        private LocalDateTime now;


        private String photo;


        private int bookmark;

        private String nickName;
        private String userPhoto;

        private String category;

        private int pin;

        private int likeCheck;

        private long likeCount;

        private int pick;
        private List<BoardTagDto.Response> tags;

        private List<CommentDto.Response> comments;

    }
}
