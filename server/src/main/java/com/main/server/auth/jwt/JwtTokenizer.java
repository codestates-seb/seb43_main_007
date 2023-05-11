package com.main.server.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.validation.Valid;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {
    @Getter
    @Value("${JWT_SECRET_KEY}") //JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드
    private String secretKey;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}") //JWT 생성 시 필요한 정보이며, 해당 정보는 application.yml 파일에서 로드
    private int refreshTokenExpirationsMinutes;

    public JwtTokenizer() {
    }

    public String encodeBase64SecretKey(String secretKey) { //PlainText형태인 SecretKey -> Secret Key byte[]를 Base64의 문자열로 인코딩
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateAccessToken(Map<String, Object> claims, //인증된 사용자에게 JWT 최초 발급 JWT생성 메서드
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }


    public String generateRefreshToken(String subject, //Refresh token 생성 메서드
                                       Date expiration,
                                       String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);


        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public Map<String, Object> verifySignature(String jws, String base64EncodedSecretKey) { // JWT 검증
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(jws).getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("Expired JWT");
        }
    }

    public Date getTokenExpiration(int expirationMinutes) { //JWT의 만료 일시를 지정하기 위한 메서드로 JWT 생성 시 사용
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }
    
    
    //여기 클래스에서만 사용
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) { //JWT의 서명에 사용할 Secret Key를 생성
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

}
