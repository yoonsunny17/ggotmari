package com.ssafy.common.util;

import io.jsonwebtoken.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@Log4j2
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private Integer expirationTime;

    public String createToken(String email){
        Date now = new Date();
        String jwt = Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationTime))
                .claim("email", email)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
        return jwt;
    }

    private Claims getClaims(String token){
        try{
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            // 유효기간 초과
            System.out.println(e.getMessage());
            throw e;
        } catch (UnsupportedJwtException e) {
            // 형식이 일치하지 않는 JWT
            System.out.println(e.getMessage());
            throw e;
        } catch (MalformedJwtException e) {
            // JWT가 올바르게 구성되지 않았을 경우
            System.out.println(e.getMessage());
            throw e;
        } catch (SignatureException e) {
            // 기존 서명을 확인하지 못한 경우
            System.out.println(e.getMessage());
            throw e;
        } catch (IllegalArgumentException e) {
            // claims가 비어있는 경우
            System.out.println(e.getMessage());
            throw e;
        } catch (Exception e) {
            throw e;
        }
    }

    public String getUserEmailFromToken(String token){
        return (String) getClaims(token).get("email");
    }

}
