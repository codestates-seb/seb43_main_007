package com.main.server.auth.handler;


import com.main.server.member.entity.Member;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;


@Getter
public class MemberRegistraionApplicationEvent extends ApplicationEvent{
    private Member member;
    public MemberRegistraionApplicationEvent (Object source, Member member){
        super(source);
        this.member = member;
    }
}
