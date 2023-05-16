package com.main.server.auth.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//  인증 성공 시 처리하는 핸들러 클래스
@Slf4j
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        // 인증 성공 후, 로그를 기록하거나 사용자 정보를 response로 전송하는 등의 추가 작업을 할 수 있다.
        log.info("# Authenticated successfully!");
    }


}

// 이 클래스를 사용하려면 onAuthenticationSuccess 메서드 내부에 인증 성공 후 수행할 로직을 작성해야 합니다.
// 예를 들어, 인증 성공 후 사용자를 특정 페이지로 리다이렉트하는 등의 동작을 수행할 수 있습니다.
