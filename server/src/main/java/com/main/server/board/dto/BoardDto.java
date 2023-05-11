package com.main.server.board.dto;

import com.main.server.board.entity.BoardTag;
import com.main.server.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BoardDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        @NotEmpty(message = "제목을 작성해 주세요.")
        private String title;
        @NotEmpty(message = "내용을 작성해 주세요.")
        @Length(min = 10, message = "내용은 10자 이상 작성하셔야 합니다.")
        private String content;

        private String address;
//        private List<Tag> tags;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Put{
        private Long boardId;
        @NotEmpty(message = "제목을 작성해 주세요.")
        private String title;
        @NotEmpty(message = "내용을 작성해 주세요.")
        @Length(min = 10, message = "내용은 10자 이상 작성하셔야 합니다.")
        private String content;

        private String address;
//        private List<Tag> tags;

    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private String title;
        private String content;
        private String address;
        private LocalDateTime now;

        private String photo;

        private int like;

        private int bookmark;


//        private List<Tag> tags;

    }
}
