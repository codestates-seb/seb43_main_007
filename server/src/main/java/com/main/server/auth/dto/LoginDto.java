package com.main.server.auth.dto;

import lombok.Getter;


//로그인 인증 정보 역직렬화(Deserialization)를 위한 LoginDTO 클래스
@Getter
public class LoginDto {
    private String username;
    private String password;
}
