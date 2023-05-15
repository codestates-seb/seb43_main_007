package com.main.server.auth.handler;

import com.main.server.exception.ExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 인증 실패 시 처리하는 핸들러 클래스
@Slf4j
public class UserAuthenticationFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        log.error(" Authentication failed : {}", exception.getMessage());

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.setStatus(400);
        String message = "";

        if(exception.getMessage().equals("자격 증명에 실패하였습니다.")){
            message = ExceptionCode.MEMBER_NOT_FOUND.getMessage();

        }else if(exception.getMessage().equals("유효하지 않은 사용자입니다.")){
            message = ExceptionCode.MEMBER_NOT_FOUND.getMessage();
        }else{
            message = ExceptionCode.MEMBER_NOT_FOUND.getMessage();
        }

        String result = "{\"status\" : \""+400+"\",\n\"message\": \"" +message +"\"\n}";
        response.getWriter().write(result);



    }

    private void sendErrorResponse(HttpServletResponse response) {

    }
}
