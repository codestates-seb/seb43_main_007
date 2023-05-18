package com.main.server.member.entity;

import lombok.Getter;

@Getter
public enum Question { //회원등록시 필요한 질문답변에서 질문

    QUESTION1("내가 졸업한 초등학교는?"),
    QUESTION2("내 별명은?"),
    QUESTION3("내 보물 1호는?"),
    QUESTION4("내가 가장 자주먹는 커피메뉴는?");
    //"내가 졸업한 초등학교는?",
    //"내 별명은?",
    //"내 보물 1호는?",
    //"내가 가장 자주먹는 커피메뉴는?",



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
