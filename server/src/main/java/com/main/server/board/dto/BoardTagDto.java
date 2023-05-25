package com.main.server.board.dto;

import lombok.Builder;
import lombok.Data;

public class BoardTagDto {
    @Data
    public static class Add {
        private String tagName;
    }

    @Data
    @Builder
    public static class Response {
        private long tagId;
        private String tagName;

        public Response(long tagId, String tagName){
            this.tagId = tagId;
            this.tagName = tagName;
        }
    }
}
