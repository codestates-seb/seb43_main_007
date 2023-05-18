package com.main.server.auth.service;

import com.main.server.auth.utils.CustomAuthorityUtils;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class MemberDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public MemberDetailService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MemberDetails(findMember);  // (1) 개선된 부분
    }

    //MemberDetails 클래스 추가
    //UserDetails 인터페이스를 구현하고 있고 또한 Member 엔티티 클래스를 상속.
    //이렇게 구성하면 데이터베이스에서 조회한 회원 정보를 Spring Security의 User 정보로 변환하는 과정과
    //User의 권한 정보를 생성하는 과정을 캡슐화
    private final class MemberDetails extends Member implements UserDetails {
        MemberDetails(Member member) {
            setMemberId(member.getMemberId());
            setNickname(member.getNickname());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setProfileImageUrl(member.getProfileImageUrl());
            setAnswer(member.getAnswer());
            setQuestion(member.getQuestion());
            setComments(member.getComments());
            setBoards(member.getBoards());
            setRRN(member.getRRN());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles());
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

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

}