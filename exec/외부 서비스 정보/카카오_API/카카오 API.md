# 카카오 API

# **Kakao Auth Login**

---

## 1. kakao login이란?

- OAuth 2.0 기반의 소셜 로그인 서비스
- 사용자가 카카오톡 또는 카카오계정으로 손쉽게 서비스에 로그인할 수 있다.

## 2. Kakao developers 애플리케이션 추가 및 설정

- kakao developers의 내 애플리케이션에서 추가하기

![Untitled](/exec/외부 서비스 정보/카카오_API/카카오 API/Untitled.png)

- 내 애플리케이션 > 앱 설정 > 플랫폼 Web 사이트 도메인 수정

![Untitled](/exec/외부 서비스 정보/카카오_API/카카오 API/Untitled 1.png)

kakao 애플리케이션에서 접속할 수 있게 사용할 도메인을 추가해줍니다.

- 내 애플리케이션 > 제품 설정 > 카카오 로그인 설정

![Untitled](/exec/외부 서비스 정보/카카오_API/카카오 API/Untitled 2.png)

활성화 설정을 on으로 해준 다음, redirect URL에 로그인 버튼 누른 후 이동할 Front page의 URL을 적어줍니다.

- 내 애플리케이션 > 제품 설정 > 카카오 로그인 > 동의항목

![Untitled](/exec/외부 서비스 정보/카카오_API/카카오 API/Untitled 3.png)

페이지 가입 시 사용자에게 동의 후 받을 정보를 설정합니다. (저희 서비스는 이메일만 받아오도록 설정하였습니다.)

## 3. 인가 코드 받기

- Front(React) 페이지에서 카카오 로그인 버튼을 누르면 미리 설정해둔 Redirect URL로 페이지 이동후 code param으로 인가 코드를 전달 받습니다.

```jsx
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleLoginClick = () => {
    router.push(KAKAO_AUTH_URL);
  };

<button onClick={handleLoginClick}>
            {/* <img src={kakao_oauth.src} /> */}
            <Image
              src={kakao_oauth.src}
              layout="fixed"
              width={192}
              height={48}
            />
</button>
```

## 4. 인가 코드로 토큰 받은 후 사용자 정보 가져오기

- Redirect URL로 설정한 페이지에서 param로 받은 인가 코드를 추출 후 Rest API 요청 후 JWT 토큰을 받아서 localStorage에 저장

```jsx
const router = useRouter();
const [kakaoCode, setKakaoCode] = useState(router.asPath.split("=")[1]);

useEffect(() => {
    doLogin(
      kakaoCode,
      (res) => {
        localStorage.setItem("accessToken", res.data.token);
        router.push("/");
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
```

- Rest Controller에서 받은 인가 코드로 kakao API에 요청하여 토큰 받기

```java
@Value("${kakao.client.id}")
private String KAKAO_CLIENT_ID;
@Value("${kakao.redirect.uri}")
private String KAKAO_REDIRECT_URI;

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
}
```

- Kakao에서 받은 토큰으로 사용자 정보 가져오기

```java
public String getKakaoEmail(String code) {
    RestTemplate restTemplate = new RestTemplate();
		// 토큰 전달 받음
    JSONObject jsonObject = new JSONObject(tokenResponse.getBody());

    String access_token = jsonObject.getString("access_token");
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
}
```

- 사용자 정보에서 필요한 정보 뽑아내기 (email)

```java
JSONObject jsonObject2 = new JSONObject(apiResponse.getBody());
JSONObject kakao_account = (JSONObject) jsonObject2.get("kakao_account");
String email = kakao_account.getString("email");
```
