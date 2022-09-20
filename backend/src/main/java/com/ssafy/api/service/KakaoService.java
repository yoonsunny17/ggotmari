package com.ssafy.api.service;

import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoService {
    private final String KAKAO_CLIENT_ID = "bcf2bd5b8708530d7dc5a312ad648204";
    private final String KAKAO_REDIRECT_URI = "http://localhost:3000/login/kakao";

    private Map<String, String> kakaoTokenMap = new HashMap<>();

    public String getKakaoEmail(String code) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders tokenRequestHeader = new HttpHeaders(); // http 요청 헤더 만들기
        tokenRequestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> tokenRequestBody = new LinkedMultiValueMap<>(); // http 요청 바디 만들기
        tokenRequestBody.add("grant_type", "authorization_code");
        tokenRequestBody.add("code", code);
        tokenRequestBody.add("client_id", KAKAO_CLIENT_ID);
        tokenRequestBody.add("redirect_uri", KAKAO_REDIRECT_URI);

        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(tokenRequestBody,
                tokenRequestHeader);

        ResponseEntity<String> tokenResponse = restTemplate.exchange( // 인증 코드로 토큰을 요청한다.
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                tokenRequest,
                String.class
        );

        // 토큰 전달 받음
        JSONObject jsonObject = new JSONObject(tokenResponse.getBody());
        System.out.println("카카오토큰 받아온거 테스트 kakaoService 41줄");
        System.out.println(tokenResponse.toString());

        String access_token = jsonObject.getString("access_token");
        String refresh_token = jsonObject.getString("refresh_token");
        Integer expires_in = (Integer) jsonObject.get("expires_in");
        Integer refresh_token_expires_in = (Integer) jsonObject.get("refresh_token_expires_in");
        String token_type = jsonObject.getString("token_type");

        // 토큰으로 카카오 API 호출 (카카오 서버에서 토큰 유효성 확인후 사용자 데이터 받아옴)
        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.add("Authorization", "Bearer " + access_token);
        apiRequestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf8");
        HttpEntity<HttpHeaders> apiRequest = new HttpEntity<>(apiRequestHeader);

        HttpEntity<String> apiResponse = restTemplate.exchange( // 토큰과 함께 api를 호출한다.
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                apiRequest,
                String.class
        );

        System.out.println("카카오정보 받아온거 테스트 kakaoService 63줄");
        System.out.println(apiResponse.toString());

        JSONObject jsonObject2 = new JSONObject(apiResponse.getBody());
        JSONObject kakao_account = (JSONObject) jsonObject2.get("kakao_account");
        String email = kakao_account.getString("email");

        //카카오 토큰 저장해주기
        kakaoTokenMap.put(email,access_token);
        return email;
    }

    public boolean deleteUser(String email) {
        RestTemplate restTemplate = new RestTemplate();

        String access_token = kakaoTokenMap.get(email);

        HttpHeaders apiRequestHeader = new HttpHeaders();
        apiRequestHeader.add("Authorization", "Bearer " + access_token);
        apiRequestHeader.add("Content-type", "application/x-www-form-urlencoded;charset=utf8");
        HttpEntity<HttpHeaders> apiRequest = new HttpEntity<>(apiRequestHeader);

        HttpEntity<String> apiResponse = restTemplate.exchange( // 토큰과 함께 api를 호출한다.
                "https://kapi.kakao.com/v1/user/unlink",
                HttpMethod.POST,
                apiRequest,
                String.class
        );

        System.out.println(apiResponse.toString());
        return true;
    }
}
