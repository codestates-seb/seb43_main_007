package com.main.server.auth.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    @Autowired
    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String recipientEmail, String subject, String message) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);

        try {
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            helper.setText(message, false); // HTML 형식의 메일 내용을 전송할 때 true로 설정

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // 메일 전송 실패 시 예외 처리
            e.printStackTrace();
        }
    }
}
