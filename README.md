# 🌼꽃마리🌼

> 판매량과 사용자 취향 기반 빅데이터 꽃 추천 플랫폼

<br/>

## 🌱기획

![image.png](./output/기획서.png)

<br/>

## [🛠기술 스택](https://lab.ssafy.com/s07-bigdata-recom-sub2/S07P22A303/-/wikis/Tech-Stack)

#### Communication Tool

> <img src="https://img.shields.io/badge/gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white">
> <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white">
> <img src="https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white">
> <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white">

#### Development Tool

> <img src="https://img.shields.io/badge/vscode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white">
> <img src="https://img.shields.io/badge/intellij-000000?style=for-the-badge&logo=intellijidea&logoColor=white">
> <img src="https://img.shields.io/badge/mysql_workbench-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

#### FrontEnd

> <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
> <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">

#### BackEnd

> <img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">
> <img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
> <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">
> <img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">
> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

#### Server

> <img src="https://img.shields.io/badge/aws-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
> <img src="https://img.shields.io/badge/ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
> <img src="https://img.shields.io/badge/s3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">
> <img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white">
> <img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white">
> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

<br/>
<br/>

## 📚산출물

### 설계 산출물

<details>
<summary>추천 시스템</summary>
<div markdown="1">

-   태그별 꽃 추천
    -   KNN 알고리즘 - 코사인 유사도 활용
    -   유저 간 컬렉션에 담은 꽃 유사도 점수와 최근 일주일 화훼 유통 데이터 점수를 7:3으로 적용
    -   화훼 유통 데이터는 최근 3년 간의 데이터 사용
    -   판매량에 따라 점수 부여(판매량 점수)
        -   1만 손 ↑ = 6점
        -   5천 손 ↑ = 3점
        -   5천 손 ↓ = 1점
    -   판매량을 연도에 따라 가중치 적용
        -   올해 = 0.6 \* 판매량 점수
        -   작년 = 0.3 \* 판매량 점수
        -   재작년 0.1 \* 판매량 점수
    -   유사도와 판매량을 함께 계산하여 0.5 이상의 유사도 중 높은 순으로 18개까지 품종 추천
        -   만약 18개의 추천이 불가능한 경우 인기순으로 추가
-   좋아요 기반 게시글 추천
    -   KNN 알고리즘 - 코사인 유사도 활용
    -   유저간 좋아요를 누른 게시글 유사도 점수를 계산하여 0.5 이상의 유사도 중 높은 순서대로 4개의 게시글 추천
        -   만약 4개의 추천이 불가능한 경우 인기순으로 추가
-   편지 내용 기반 꽃 추천
    -   TF-IDF 활용
    -   편지 내용에서 중요 단어를 찾아 꽃말과 매칭
    -   편지 내용과 꽃말을 형태소 단위로 분리하여 비교

</div>
</details>

<details>
<summary>ER Diagram</summary>
<div markdown="1">

![image.png](./output/ERD.png)

</div>
</details>

<details>
<summary>API 명세서</summary>
<div markdown="1">

![image.png](./output/API명세서.png)

</div>
</details>

<details>
<summary>주요 기능 시퀀스 다이어그램</summary>
<div markdown="1">

-   꽃
    -   오늘의 꽃
        ![image.png](./output/시퀀스다이어그램/오늘의_꽃.png)
    -   꽃 검색
        ![image.png](./output/시퀀스다이어그램/꽃_검색.png)
    -   품종 상세페이지 조회
        ![image.png](./output/시퀀스다이어그램/품종_상세페이지_조회.png)
    -   컬렉션 추가
        ![image.png](./output/시퀀스다이어그램/컬렉션_추가.png)
-   추천
    -   대상 기반 꽃 추천
        ![image.png](./output/시퀀스다이어그램/대상_기반.png)
    -   편지 기반 꽃 추천
        ![image.png](./output/시퀀스다이어그램/편지_기반.png)
    -   좋아요 기반 게시글 추천
        ![image.png](./output/시퀀스다이어그램/게시글.png)
-   커뮤니티
    -   글 작성
        ![image.png](./output/시퀀스다이어그램/글_작성.png)
    -   전체 글 조회
        ![image.png](./output/시퀀스다이어그램/전체_글_조회.png)
    -   상세 글 조회
        ![image.png](./output/시퀀스다이어그램/상세_글_조회.png)
    -   댓글 작성
        ![image.png](./output/시퀀스다이어그램/댓글_작성.png)
-   회원정보
    -   회원가입 및 로그인
        ![image.png](./output/시퀀스다이어그램/회원가입_로그인.png)
    -   회원정보 조회
        ![image.png](./output/시퀀스다이어그램/회원정보_조회.png)

</div>
</details>

<details>
<summary>아키텍처</summary>
<div markdown="1">

![image.png](./output/아키텍처.png)

</div>
</details>

<details>
<summary>기능 명세서</summary>
<div markdown="1">

![image.png](./output/기능명세서.png)

</div>
</details>

### 디자인 산출물

<details>
<summary>컬러 팔레트</summary>
<div markdown="1">

![image.png](./output/컬러팔레트.png)

</div>
</details>

<details>
<summary>목업</summary>
<div markdown="1">

![image.png](./output/목업/목업1.png)
![image.png](./output/목업/목업2.png)
![image.png](./output/목업/목업3.png)
![image.png](./output/목업/목업4.png)
![image.png](./output/목업/목업5.png)

</div>
</details>

<details>
<summary>화면 정의서</summary>
<div markdown="1">

![image.png](./output/화면정의서/슬라이드1.JPG)
![image.png](./output/화면정의서/슬라이드2.JPG)
![image.png](./output/화면정의서/슬라이드3.JPG)
![image.png](./output/화면정의서/슬라이드4.JPG)
![image.png](./output/화면정의서/슬라이드5.JPG)
![image.png](./output/화면정의서/슬라이드6.JPG)
![image.png](./output/화면정의서/슬라이드7.JPG)
![image.png](./output/화면정의서/슬라이드8.JPG)
![image.png](./output/화면정의서/슬라이드9.JPG)
![image.png](./output/화면정의서/슬라이드10.JPG)
![image.png](./output/화면정의서/슬라이드11.JPG)
![image.png](./output/화면정의서/슬라이드12.JPG)
![image.png](./output/화면정의서/슬라이드13.JPG)
![image.png](./output/화면정의서/슬라이드14.JPG)
![image.png](./output/화면정의서/슬라이드15.JPG)

</div>
</details>

<br/>

## 📣기능 설명

<details>
<summary>꽃</summary>
<div markdown="1">

![image.png](./output/기능설명/꽃.PNG)

</div>
</details>

<details>
<summary>커뮤니티</summary>
<div markdown="1">

![image.png](./output/기능설명/커뮤니티.PNG)

</div>
</details>

<details>
<summary>회원정보</summary>
<div markdown="1">

![image.png](./output/기능설명/회원정보.PNG)

</div>
</details>

<details>
<summary>기타</summary>
<div markdown="1">

![image.png](./output/기능설명/기타.PNG)

</div>
</details>

<br/>

## 💻서비스

-   [꽃마리 URL](https://ggotmari.com/)
-   [서비스 이용 가이드](https://a303-princess.notion.site/690dcc0e597b4a7886754f98b493371d)
-   [UCC](https://www.youtube.com/watch?v=F-DhYVAxK2E)

<br/>

## 🔌포팅 매뉴얼

-   빌드 및 배포
    - [Jenkind + Docker](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker.md)
    - [기술 스택 버전 정보](/exec/빌드 및 배포/기술 스택 버전.md)
    - [빌드 매뉴얼](/exec/빌드 및 배포/빌드 매뉴얼.md)
-   외부 서비스
    - [네이버 OCR](/exec/외부 서비스 정보/네이버_OCR/네이버 OCR.md)
    - [카카오 API](/exec/외부 서비스 정보/카카오_API/카카오 API.md)
    - [Redis](/exec/외부 서비스 정보/Redis.md)
    - [데이터 수집, 정제, 크롤링](/exec/외부 서비스 정보/데이터_수집_정제_크롤링.md)
-   [DB 덤프 파일](/exec/꽃마리_DB_dump.sql)
-   [시연 시나리오](/exec/시연 시나리오.pdf)

<br/>

## ✔ 테스팅

<details>
<summary>QA</summary>
<div markdown="1">

![image.png](./output/QA.jpg)

</div>
</details>

<br/>

## 😀 팀원 소개

> [꽃마리 NOTION](https://a303-princess.notion.site/97e776287f304c1f8492d1f622f448c7)

| 이름   | 담당     | 역할 | 내용                                                    |
| ------ | -------- | ---- | ------------------------------------------------------- |
| 문요성 | FrontEnd | 팀장 | - 목업 <br/> - 컴포넌트 구현 <br/> - 발표               |
| 박영준 | FrontEnd | 팀원 | - 목업 <br/> - 컴포넌트 구현 <br/> - OCR                |
| 전윤선 | FrontEnd | 팀원 | - 목업 <br/> - 컴포넌트 구현 <br/> - UCC 촬영           |
| 이지수 | BackEnd  | 팀원 | - 데이터 수집 <br/> - 추천 시스템 구현 <br/> - UCC 편집 |
| 정윤영 | BackEnd  | 팀원 | - 데이터베이스 설계 <br/> - 문서 작업 <br/> - API 구현  |
| 지용현 | BackEnd  | 팀원 | - 서버 구축 <br/> - OAuth <br/> - API 구현              |
