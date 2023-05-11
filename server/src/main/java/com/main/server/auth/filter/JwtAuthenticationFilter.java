package com.main.server.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.server.auth.dto.LoginDto;
import com.main.server.auth.jwt.JwtTokenizer;
import com.main.server.member.entity.Member;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


//로그인 인증을 처리(로그인 하는거랑, 로그인 후에 활동)
@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    @SneakyThrows
    @Override
    //메서드 내부에서 인증을 시도하는 로직을 구현
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }


    //인증 성공 후 진행 매서드, accesstoken만 진행
    // 사용자 정보를 바탕으로 accesstoken을 생성하고 json으로 응답.
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal();
        //authResult.getPrincipal()로 Member 엔티티 클래스의 객체를 얻음. (인증된 사용자를 나타내는 객체)

        //토큰 두개 생성
        String accessToken = delegateAccessToken(member);
        //String refreshToken = delegateRefreshToken(member);

        //Access Token은 클라이언트 측에서 백엔드 애플리케이션 측에 요청을 보낼 때마다
        //request header에 추가해서 클라이언트 측의 자격(로그인 되었는지)을 증명하는 데 사용
        String result = "{\"accessToken\" : \"" + accessToken + "\"}";
        response.setStatus(200);
        response.getWriter().write(result);

        //response.setHeader("Authorization","Bearer "+ accessToken);
        //response.setHeader("memberId", String.valueOf(member.getMemberId()));
        //response.setHeader("nickname",String.valueOf(member.getNickname()));

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);


    }

    //이 클래스에서 사용할 프라이빗 매서드, Access Token과 Refresh Token을 생성하는 구체적인 로직
    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", member.getMemberId());
        claims.put("roles", member.getRoles());
        claims.put("nickname", member.getNickname());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationsMinutes());
        String base64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64SecretKey);

        return "Bearer_" + accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationsMinutes());
        String base64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64SecretKey);

        return refreshToken;
    }
}
