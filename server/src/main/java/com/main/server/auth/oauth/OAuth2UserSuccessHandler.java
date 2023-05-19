package com.main.server.auth.oauth;

import com.main.server.auth.jwt.JwtTokenizer;
import com.main.server.auth.mail.MailService;
import com.main.server.auth.utils.CustomAuthorityUtils;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2UserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberRepository memberRepository;
    private final MailService mailService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = String.valueOf(oauthUser.getAttributes().get("email"));


        //CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        //oAuth2User.setEmail(email);
        //oAuth2User.setRoles(customAuthorityUtils.createRoles(email));

        String accessToken = delegateAccessToken(oauthUser);
        //String refreshToken = delegateRefreshToken(oAuth2User);

        String redirectURI = "http://localhost:8080/login/oauth2/code/google"; //TODO :  고치기
        log.info("## 리다이렉트 -> {}", redirectURI);
        log.info("## 토큰: {}", accessToken);
        response.setHeader("Authentication", "Bearer_" + accessToken);
        
        log.info("##해당 멤버 저장 시작");
        Member member = new Member(email, email.substring(0, email.indexOf("@")));
        memberRepository.save(member);
        log.info("##해당 멤버 저장 완료");

        mailService.sendEmail(email, "반가워요!", "정말 반갑습니다!");
        log.info("메일 전송 완료!");
        getRedirectStrategy().sendRedirect(request, response, createURI(accessToken).toString());

    }

    private URI createURI(String accessToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        //queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder.newInstance()
                //.scheme("http")
                .scheme("https")
                .host("www.naver.com") //TODO : 고치기
                .queryParams(queryParams).build().toUri();
    }

    private String delegateAccessToken(OAuth2User oAuth2User) {
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", email);
        claims.put("roles", customAuthorityUtils.createRoles(email));

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(
                jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration,
                base64EncodedSecretKey);

        return accessToken;
    }

//    private String delegateRefreshToken(CustomOAuth2User oAuth2User) {
//        String subject = oAuth2User.getEmail();
//        Date expiration = jwtTokenizer.getTokenExpiration(
//                jwtTokenizer.getRefreshTokenExpirationMinutes());
//        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
//
//        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration,
//                base64EncodedSecretKey);
//
//        return refreshToken;
//    }
}