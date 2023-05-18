package com.main.server.member.dto;

import com.main.server.board.dto.BoardDto;
import com.main.server.board.entity.Board;
import com.main.server.comment.dto.CommentDto;
import com.main.server.comment.entity.Comment;
import com.main.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Comparator;
import java.util.List;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Post { //mem001

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank
        private String passwordConfirm;
        
        @NotBlank //주민번호
        private String RRN;

        @NotBlank(message = "닉네임은 공백이 아니어야 합니다")
        @Size(max = 10, message = "닉네임은 10글자 이하여야 합니다")
        private String nickname;

        private String question;
        private String answer;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PatchNickname {
        private long memberId;
        private String newNickname;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PatchPassword {
        private long memberId;
        private String nowPassword;
        private String newPassword;
        private String passwordConfirm;
    }


    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GetMyPage {
        private long memberId;
        private String nickname;
        private String imageUrl;
        private List<BoardDto.Response> boards;
        private List<CommentDto.Response> comments;
    }

    @Getter
    @AllArgsConstructor
    public static class findIdDto {
        private String RRNConfirm;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class findPasswordDto {
        private long memberId;
        private String answer;
    }

    @Getter
    @AllArgsConstructor
    public static class ResponseDto {

    }









}
