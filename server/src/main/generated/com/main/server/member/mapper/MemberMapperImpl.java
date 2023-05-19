package com.main.server.member.mapper;

import com.main.server.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-05-17T21:35:31+0900",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 11.0.18 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public String memberToAnswerResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        String string = new String();

        return string;
    }
}
