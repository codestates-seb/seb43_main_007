package com.main.server.member.entity;

import lombok.Getter;

@Getter
public enum Question { //회원등록시 필요한 질문답변에서 질문

    QUESTION1("질문 예시 1"),
    QUESTION2("질문 예시 2 앞의 q1q2는 알아보기 쉽게 바꿀것");



    private final String value;
    private Question(String value) {
        this.value = value;
    }

    public static Question fromString(String value) {
        for(Question question : Question.values()) {
            if(question.value.equalsIgnoreCase(value)) return question;
        }

        throw new IllegalArgumentException(value + "는, 지정한 질문 값이 아닙니다");
    }

}
