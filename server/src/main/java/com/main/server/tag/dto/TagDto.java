package com.main.server.tag.dto;

import lombok.Data;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

public class TagDto {
    @Getter
    public static class Post {
        @Length(max = 10, message = "태그는 10자 이하여야 합니다.")
        private String tagName;
    }

    @Data
    public static class Response {
        private long tagId;
        private String tagName;
    }
}
