package com.main.server.auth.filter;


import com.main.server.auth.jwt.JwtTokenizer;
import com.main.server.auth.userservice.MemberDetailService;
import com.main.server.auth.utils.CustomAuthorityUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

//request header에 포함된 JWT에 대해 검증 작업을 수행하는 JwtVerificationFilter의 코드
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberDetailService memberDetailService;
    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, MemberDetailService memberDetailService) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberDetailService = memberDetailService;
    }

    // 매 요청마다 필터링되는 로직을 구현
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //Access Token
        // 요청 헤더에서 Authorization 값을 가져와서 "Bearer_" 문자열을 제거하여 jws 변수에 저장
        // JwtTokenizer 클래스의 encodeBase64SecretKey() 메서드를 사용하여 시크릿 키를 Base64 인코딩하여 base64EncodedSecretKey 변수에 저장
        String jws = request.getHeader("Authorization").replace("Bearer_", "");
        String base64SecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());


        //Verify AccessToken
        // JwtTokenizer 클래스의 verifySignature() 메서드를 사용하여 Access Token의 유효성을 검증
        // Access Token에 포함된 클레임 정보를 claims 변수에 저장
        Map<String, Object> claims = jwtTokenizer.verifySignature(jws, base64SecretKey);

        setAuthenticationContext(claims);

        filterChain.doFilter(request, response);
    }


    //여기 클래스에서만 사용하는 매서드

    // shouldNotFilter() 메서드를 재정의하여 필터링하지 않아도 되는 요청을 설정
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        // Authorization 헤더가 없거나, "Bearer_" 문자열을 포함하지 않은 경우 필터링하지 않는다.
        String authentication = request.getHeader("Authorization");

        return authentication == null || !authentication.startsWith("Bearer_");
    }



    // 클레임 정보를 사용하여 UserDetails 객체를 생성하고, UsernamePasswordAuthenticationToken 객체를 생성하여
    // SecurityContextHolder의 Authentication 객체로 설정하는 메서드이다
    private void setAuthenticationContext(Map<String, Object> claims) {
        UserDetails userDetails = memberDetailService.loadUserByUsername((String) claims.get("username"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
