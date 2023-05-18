package com.main.server.auth.oauth;

import com.main.server.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * 각 소셜에서 받아오는 데이터가 다르므로
 * 소셜별로 데이터를 받는 데이터를 분기 처리하는 DTO 클래스
 */
@Getter
public class OAuthAttributes {

    private String nameAttributeKey; // OAuth2 로그인 진행 시 키가 되는 필드 값, PK와 같은 의미
    private GoogleOAuth2UserInfo oauth2UserInfo; // 소셜 타입별 로그인 유저 정보(닉네임, 이메일, 프로필 사진 등등)

    @Builder
    public OAuthAttributes(String nameAttributeKey, GoogleOAuth2UserInfo oauth2UserInfo,
                           PasswordEncoder passwordEncoder) {
        this.nameAttributeKey = nameAttributeKey;
        this.oauth2UserInfo = oauth2UserInfo;
    }

    public static OAuthAttributes of( String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oauth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    /**
     * of메소드로 OAuthAttributes 객체가 생성되어, 유저 정보들이 담긴 OAuth2UserInfo가 소셜 타입별로 주입된 상태
     * OAuth2UserInfo에서 socialId(식별값), nickname, imageUrl을 가져와서 build
     * email에는 UUID로 중복 없는 랜덤 값 생성
     * role은 GUEST로 설정
     * 비밀번호는 임의로 작성
     */
    public Member toEntity(GoogleOAuth2UserInfo oauth2UserInfo) {
//        String location;
//        switch (oauth2UserInfo.getLocation()){
//            case "ko": location = "KR"; break;
//            case "ja": location = "JP"; break;
//            default: location = oauth2UserInfo.getLocation().toUpperCase();
//        }
        return new Member(oauth2UserInfo.getEmail(), oauth2UserInfo.getName());
//        return Member.builder()
//                .email(oauth2UserInfo.getEmail())
//                .name(oauth2UserInfo.getName())
//                .profile(oauth2UserInfo.getImageUrl())
//                .location(location)
//                .password(new BCryptPasswordEncoder().encode(UUID.randomUUID().toString().substring(0, 6)))
//                .roles(List.of("USER"))
//                .build();
    }
}
