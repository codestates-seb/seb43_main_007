package com.main.server.auth.userservice;

import com.main.server.auth.utils.CustomAuthorityUtils;
import com.main.server.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// spring security에서 인증된 사용자에대한 정보를 나타내는 클래스.
// 멤버디테일서비스, 오어스멤버디테일서비스 (동일 패키지)에서 사용할것.
@Slf4j
public class PrincipalDetails extends Member implements UserDetails, OAuth2User {

    private Map<String, Object> attributes;




    //MemberDatails
    public PrincipalDetails(Member member) {
        setMemberId(member.getMemberId());
        setEmail(member.getEmail());
        setRoles(member.getRoles());
        setAnswer(member.getAnswer());
        setNickname(member.getNickname());
        setPassword(member.getPassword());
        setRRN(member.getRRN());
        setQuestion(member.getQuestion());
        setProfileImageUrl(member.getProfileImageUrl());
    }

    public PrincipalDetails(Member member, Map<String, Object> attributes) {
        setMemberId(member.getMemberId());
        setEmail(member.getEmail());
        setRoles(member.getRoles());
        setAnswer(member.getAnswer());
        setNickname(member.getNickname());
        setPassword(member.getPassword());
        setRRN(member.getRRN());
        setQuestion(member.getQuestion());
        setProfileImageUrl(member.getProfileImageUrl());
        this.attributes = attributes;
    }

    //Oauth2
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<String> roles = this.getRoles();
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE" + role))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    //얘가 다른점
    @Override
    public boolean isEnabled() {
        return true;
    }
}
