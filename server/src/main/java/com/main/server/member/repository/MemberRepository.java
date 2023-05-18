package com.main.server.member.repository;

import com.main.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail (String mail);
    Optional<Member> findByNickname (String nickname);
    Optional<Member> findByRRN (String RRN);
}
