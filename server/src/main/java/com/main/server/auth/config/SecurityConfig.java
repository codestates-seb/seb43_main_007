package com.main.server.auth.config;

import com.main.server.auth.filter.JwtAuthenticationFilter;
import com.main.server.auth.filter.JwtVerificationFilter;
import com.main.server.auth.jwt.JwtTokenizer;
import com.main.server.auth.userservice.MemberDetailService;
import com.main.server.auth.userservice.OAuth2MemberDetailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

// 이 클래스가 spring 구성 영역 구성을 담당하는 클래스임을 나타냄
@Configuration
// spring security를 사용하기위한 필수 구성을 활성화함.
@EnableWebSecurity
// 메소드 단위로 권한 검사를 하기 위해 사용됨. prepostenabled =true로 되면 메소드 단위로
// preauthorize및 postauthorize 애노테이션을 사용하여 권한 검사를 할 수 있음.
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig { //OAuth2 로그인을 처리하기 위한 필수 구성을 포함함.


//    //     Google OAuth2 클라이언트 ID와 클라이언트 비밀번호
//    @Value("${spring.security.oauth2.client.registration.google.clientId}")
//    private String clientId;
//
//    @Value("${spring.security.oauth2.client.registration.google.clientSecret}")
//    private String clientSecret;

    //DI
    private final JwtTokenizer jwtTokenizer;
    private final MemberDetailService memberDetailService;
//    private final OAuth2MemberDetailService oAuth2MemberDetailService;
    //TODO : OAuth2UserSuccessHandler 클래스 만든 후 di 하나 더

    public SecurityConfig(JwtTokenizer jwtTokenizer,
                          MemberDetailService memberDetailService
                          ) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberDetailService = memberDetailService;
    }

    //여기가 핵심
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                // clickjacking 공격 방지
                .headers().frameOptions().sameOrigin()

                //csrf 공격 방지
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()

                // JWT 인증 필터와 JWT 검증 필터를 등록
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().permitAll());
                //.oauth2Login()
                //.successHandler() 오어스 멤버석세스핸들러
                //.userInfoEndpoint().userService(oAuth2MemberDetailService); //후처리
        return http.build();
    }



    //암호화 패스워드 생성
    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    //cors설정 위해
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();


        corsConfiguration.setAllowedOrigins(List.of("*")); //모든 출처 HTTP통신 허용
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PATCH", "DELETE"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }


    //아래는 내가 작성한 AuthService와 Filter들을 사용해 커스텀필터를 만드는것.
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("members/login");
            //TODO : 성공핸들러, 실패핸들러 추가작성 (handler 패키지 추가)

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, memberDetailService);

            builder.addFilter(jwtAuthenticationFilter);
            builder.addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);

        }
    }
}
