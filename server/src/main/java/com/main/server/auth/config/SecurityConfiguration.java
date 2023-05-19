package com.main.server.auth.config;


import com.main.server.auth.filter.JwtAuthenticationFilter;
import com.main.server.auth.filter.JwtVerificationFilter;
import com.main.server.auth.handler.MemberAccessDeniedHandler;
import com.main.server.auth.handler.MemberAuthenticationEntryPoint;
import com.main.server.auth.handler.MemberAuthenticationFailureHandler;
import com.main.server.auth.handler.MemberAuthenticationSuccessHandler;
import com.main.server.auth.jwt.JwtTokenizer;
import com.main.server.auth.oauth.CustomOAuth2UserService;
import com.main.server.auth.oauth.OAuth2UserFailureHandler;
import com.main.server.auth.oauth.OAuth2UserSuccessHandler;
import com.main.server.auth.utils.CustomAuthorityUtils;
import com.main.server.member.repository.MemberRepository;
import com.main.server.member.service.MemberService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
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

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Value("${spring.security.oauth2.client.registration.google.clientId}")  // (1)
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.clientSecret}") // (2)
    private String clientSecret;


    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final MemberRepository memberRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils,
                                 CustomOAuth2UserService customOAuth2UserService,
                                 CustomAuthorityUtils customAuthorityUtils,
                                 MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.customOAuth2UserService = customOAuth2UserService;
        this.customAuthorityUtils = customAuthorityUtils;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())



                .and()
                .authorizeHttpRequests(authorize -> authorize
                        //.antMatchers(HttpMethod.POST, "/boards/check/**").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.POST, "/boards/pin/**").hasRole("ADMIN")
                        //.antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("USER", "ADMIN")
                        //바로 윗줄 생각. 멤버 겟 마이페이지 이런건 로그인 되어있어야하니 헤더에 Authorization 추가해야함.
                        //admin 전용 뭐 추가할거잇스면 여기에 추가
                        .anyRequest().permitAll()
                )
                .oauth2Login().loginPage("/oauth2/authorization/google")
                .successHandler(new OAuth2UserSuccessHandler(jwtTokenizer, customAuthorityUtils, memberRepository))
                .failureHandler(new OAuth2UserFailureHandler());
                //.userInfoEndpoint().userService(customOAuth2UserService);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() { //memberService에서 DI 받아 사용
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);  // (2-4)
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

    private class CustomFilterConfigurer1 extends AbstractHttpConfigurer<CustomFilterConfigurer1, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }


}
