package com.main.server.member.mapper;

import com.main.server.member.dto.MemberDto;
import com.main.server.member.entity.Member;
import com.main.server.member.entity.Question;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    //서비스 클래스에서 dto 클래스를 매서드의 매개변수로 받으면 mapper 필요없음
    //예를들어, Service의 createMember 매서드는 
    //엔티티엔 없고 dto엔 있는 비밀번호 확인같은 필드때문에 dto 자체를 서비스의 매개변수로 사용. 
    //즉 아래 memberPostDtoToMember 매서드가 필요가 없다 이말임 
    default Member memberPostDtoToMember(MemberDto.Post memberPostDto) { //mem001
        Member member = new Member();
        member.setEmail(memberPostDto.getEmail());
        member.setPassword(memberPostDto.getPassword());
        member.setRRN(memberPostDto.getRRN());
        member.setNickname(memberPostDto.getNickname());
        member.setQuestion(Question.fromString(memberPostDto.getQuestion()));
        member.setAnswer(memberPostDto.getAnswer());
        member.setCreatedAt(LocalDateTime.now());

        return member;
    }

    default Member memberNicknamePatchDtoToMember(MemberDto.PatchNickname memberNicknamePatchDto) { //mem005
        Member member = new Member();
        member.setMemberId(memberNicknamePatchDto.getMemberId());
        member.setNickname(memberNicknamePatchDto.getNewNickname());

        return member;
    }
    //Member memberProfileImagePatchDtoToMember(MemberDto.PatchProfileImage memberProfileImagePatchDto); //mem007
    //Member memberPasswordPatchDtoToMember(MemberDto.PatchPassword memberPasswordPatchDto); //mem006
    String memberToAnswerResponseDto(Member member); //mem013

    default MemberDto.GetMyPage memberToMyPageDto(Member member) {
        MemberDto.GetMyPage myPageDto = new MemberDto.GetMyPage();
        myPageDto.setMemberId(member.getMemberId());
        //myPageDto.setImageUrl(member.getProfileImageUrl());
        myPageDto.setImageUrl("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxVQ3SH6_tb5EWmT-QD-U939zONz67JbYFjkyPeij62Q&s");
        myPageDto.setNickname(member.getNickname());

        return myPageDto;
    }


}
