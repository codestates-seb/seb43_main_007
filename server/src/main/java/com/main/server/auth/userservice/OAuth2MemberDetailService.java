package com.main.server.auth.userservice;

import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class OAuth2MemberDetailService extends DefaultOAuth2UserService {
    private final MemberRepository memberRepository;

    public OAuth2MemberDetailService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest request) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(request);

        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        String password = String.valueOf(oAuth2User.getAttributes().get("password"));
        String nickname = email.replace("@gmail.com", "");

        Optional<Member> findMember = memberRepository.findByEmail(email);
        Member member = findMember.orElseGet(() -> new Member(email, password, nickname));
        memberRepository.save(member);

//        String profileURI = "https://source.boringavatars.com/beam/120/" + user.getUserId() + "?colors=66FFFF,8CBFE6,B380CC,D940B3,FF0099";
//        user.setProfileImage(profileURI);
//        user.setEmailVerified(true);
//        userRepository.save(user);

        return new PrincipalDetails(member, oAuth2User.getAttributes());

    }
}
