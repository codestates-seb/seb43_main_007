package com.main.server.auth.handler;

import com.main.server.auth.jwt.JwtTokenizer;
import com.main.server.auth.userservice.PrincipalDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

// OAuth2 인증 프로세스가 성공했을 때 실행되는 핸들러 클래스
@Component
@Slf4j
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {


    private final JwtTokenizer jwtTokenizer;

    // 메서드는 OAuth2 인증이 성공하면 실행

    public OAuth2UserSuccessHandler(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        String accessToken = delegateAccessToken(authentication);
//        String refreshToken = delegateRefreshToken(authentication);

        String uri = createURI(accessToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);

        response.setHeader("Authorization",  "Bearer " + accessToken);
    }


    // JWT 토큰은 delegateAccessToken 메서드를 통해 생성
    private String delegateAccessToken(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", principalDetails.getMemberId());
        claims.put("username", principalDetails.getEmail());
        claims.put("roles", principalDetails.getRoles());

        String subject = principalDetails.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        return jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    // JWT 토큰을 포함한 리다이렉트 URL을 생성
    private URI createURI(String accessToken) {

        //UriComponentsBuilder 클래스를 사용하여 URL을 생성하고, 쿼리 스트링에 JWT 토큰을 포함
        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                //.host("ec2-43-200-182-192.ap-northeast-2.compute.amazonaws.com:8080")
                .host("localhost:8080")
                .path("/token")
                .queryParam("Authorization", "Bearer_" + accessToken)
                .build().toUri();
    }
}