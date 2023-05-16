package com.main.server.auth.userservice;

import com.main.server.auth.utils.CustomAuthorityUtils;
import com.main.server.exception.BusinessLogicException;
import com.main.server.exception.ExceptionCode;
import com.main.server.member.entity.Member;
import com.main.server.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

//사용자의 크리덴셜을 조회한 후, 조회한 크리덴셜을 AuthenticationManager에게 전달하는 Custom UserDetailsService를 구현
@Slf4j
@Component
public class UserDetailService implements UserDetailsService {
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public UserDetailService(MemberRepository memberRepository,
                             CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new HelloUserDetails(findMember);
        //return new PrincipalDetails(findMember);
    }

    private final class HelloUserDetails extends Member implements UserDetails {
        HelloUserDetails(Member member) {
            setMemberId(member.getMemberId());
            setNickname(member.getNickname());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
            setAnswer(member.getAnswer());
            setBoards(member.getBoards());
            setComments(member.getComments());
            setProfileImageUrl(member.getProfileImageUrl());
            setQuestion(member.getQuestion());
            setRRN(member.getRRN());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            // DB에 저장된 Role 정보로 User 권한 목록 생성
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
