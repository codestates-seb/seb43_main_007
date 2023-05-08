package com.main.server.board.dto;

import com.main.server.board.entity.BoardTag;
import com.main.server.tag.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
public class BoardDto {
    @Getter
    @AllArgsConstructor
    public static class Post{
        private String title;
        private String content;

//        private List<Tag> tags;

    }
}
