package com.main.server.member.controller;

import com.main.server.dto.SingleResponseDto;
import com.main.server.member.dto.MemberDto;
import com.main.server.member.entity.Member;
import com.main.server.member.mapper.MemberMapper;
import com.main.server.member.service.MemberService;
import com.main.server.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.net.URI;

@RestController
@Slf4j
@Validated
@Transactional
public class MemberController {
    private final static String MEMBER_DEFAULT_URL = "api/members";
    private final MemberService memberService;
    private final MemberMapper memberMapper;

    public MemberController(@Lazy MemberService memberService, MemberMapper memberMapper) {  //TODO: Lazy 어노테이션 사라지게 할 방법
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }
    //mem001
    @PostMapping("api/members")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPostDto) {
        Member createMember = memberService.createMember(memberPostDto);
        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, createMember.getMemberId());

        return ResponseEntity.created(location).build();
    }

    //mem005
    @PatchMapping("api/members/nickname/{member-id}")
    public ResponseEntity patchMemberNickname(@PathVariable("member-id") @Positive long memberId,
                                               @RequestBody MemberDto.PatchNickname memberNicknamePatchDto) {
        memberNicknamePatchDto.setMemberId(memberId);
        Member patchMember = memberService.updateNickname(memberMapper.memberNicknamePatchDtoToMember(memberNicknamePatchDto));

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, patchMember.getMemberId());
        return ResponseEntity.created(location).build();
    }

    //mem006
    @PatchMapping("api/members/password/{member-id}")
    public ResponseEntity patchMemberPassword(@PathVariable("member-id") @Positive long memberId,
                                              @RequestBody MemberDto.PatchPassword memberPasswordPatchDto) {
        memberPasswordPatchDto.setMemberId(memberId);
        Member patchMember = memberService.updatePassword(memberPasswordPatchDto);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, patchMember.getMemberId());
        return ResponseEntity.created(location).build();
    }

    //mem007
    @PatchMapping("api/members/image/{member-id}")
    public ResponseEntity patchMemberImage(@PathVariable("member-id") @Positive long memberId,
                                           @RequestBody MemberDto.PatchProfileImage memberImagePatchDto) throws IOException {
        memberImagePatchDto.setMemberId(memberId);
        Member patchMember = memberService.updateProfileImage(memberImagePatchDto);

        URI location = UriCreator.createUri(MEMBER_DEFAULT_URL, patchMember.getMemberId());
        return ResponseEntity.created(location).build();
    }

    //mem009
    @DeleteMapping("api/members/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId) {
        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //mem012 답변 보여주기
    @GetMapping("api/members/question/{member-id}")
    public ResponseEntity getMemberAnswer(@PathVariable("member-id") @Positive long memberId) {
        String memberQuestion = memberService.findMemberQuestion(memberId);
        SingleResponseDto<String> response = new SingleResponseDto<>(memberQuestion);

        return ResponseEntity.ok(response);
    }

    //mem012 새 패스워드 보여주기
    @GetMapping("api/members/password/{member-id}")
    public ResponseEntity getMemberPassword(@PathVariable("member-id") @Positive long memberId,
                                            @RequestBody MemberDto.findPasswordDto findPasswordDto) {
        findPasswordDto.setMemberId(memberId);
        String memberPassword = memberService.findMemberPassword(findPasswordDto);
        SingleResponseDto<String> response = new SingleResponseDto<>(memberPassword);

        return ResponseEntity.ok(response);
    }

    //마이페이지 get요청
    @GetMapping("/mebers/mypage/{member-id}")
    public ResponseEntity getMemberMyPage(@Positive @PathVariable("member-id") long memberId) {
        return new ResponseEntity<>(memberMapper.memberToMyPageDto(memberService.findMember(memberId)), HttpStatus.OK);
    }


}
