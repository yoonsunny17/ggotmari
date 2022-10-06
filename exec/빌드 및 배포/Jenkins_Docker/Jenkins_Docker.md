# Jenkins + Docker

# Jenkins + Docker를 활용한 자동 배포

---

## 1. Jenkins, Docker 란?

- Jenkins : Git과 연동하여 선택한 Branch에 push, merge등 이벤트가 발생하면 예약된 build cell을 실행시켜 자동으로 배포해주는 것!
- Docker : 사용할 환경, 파일 등을 docker image화 시켜 어떤 환경이든 docker만 설치되어 있으면 image를 실행시켜 사용할 수 있게 해주는 것!

## 2. Docker로 Jenkins 실행시키기

- docker-compose.yml 파일 작성

```yaml
version: '3'

services:
    jenkins:
        image: jenkins/jenkins:lts
        container_name: jenkins
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock
            - /jenkins:/var/jenkins_home
        ports:
            - "9090:8080"
        privileged: true
        user: root 
```

```bash
sudo docker-compose up -d
```

명령어로 docker-compose에 작성한 jenkins를 container로 실행

j7a303.p.ssafy.io:9090 에 접속하여 초기 비밀번호를 입력하여 접속

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled.png)

```bash
docker logs jenkins
```

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 1.png)

- 접속 이후 계정명, 암호 설정해주기

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 2.png)

- 이후 각종 플러그인 설치하기! (git, docker ,ssh 등)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 3.png)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 4.png)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 5.png)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 6.png)

새로운 item > Freestyle project 생성

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 7.png)

- 생성 후 프로젝트 > 구성 > 소스코드관리

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 8.png)

gitlab Repository 주소, 원하는 target Branch 설정

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 9.png)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 10.png)

gitbal ID, Password 입력, ID는 자유로운 텍스트 입력

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 11.png)

만들어진 계정 사용

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 12.png)

빌드 유발 설정 > gitlab에 어떤 행동을 하면 Jenkins가 실행될 지 설정

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 13.png)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 14.png)

Spring boot의 경우 DockerFile에서 Image 생성할 때 gradlew를 인식하지 못하는 경우가 있어 Jenkins에서 build.gradle을 찾아서 빌드 하도록 설정

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 15.png)

```bash
docker image prune -a --force
mkdir -p /var/jenkins_home/images_tar #이미지를 저장할 폴더 생성

cd /var/jenkins_home/workspace/ggotmari/backend/ #backend 폴더로 이동
docker build -t spring . #Dockerfile을 찾아 이미지 빌드 하기
docker save spring > /var/jenkins_home/images_tar/spring.tar #만든 이미지를 폴더로 이동

cd /var/jenkins_home/workspace/ggotmari/backend_django/
docker build -t django .
docker save django > /var/jenkins_home/images_tar/django.tar

cd /var/jenkins_home/workspace/ggotmari/frontend/ggotmari
docker build -t react .
docker save react > /var/jenkins_home/images_tar/react.tar

ls /var/jenkins_home/images_tar
```

아래에 Execute shell을 추가하여 shell 명령어 작성

- 깃랩 WebHook 을 연결하여 자동 빌드를 설정해줍니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 16.png)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 17.png)

- URL의 deploytest는 위 jenkins에서 생성한 item이름을 적어줍니다.
- Add webhook을 클릭하여 추가해줍니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 18.png)

젠킨스 홈페이지에서 `Jenkins 관리`를 클릭하고, 이어서 `시스템 설정`을 클릭합니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 19.png)

시스템 설정 칸에서 스크롤을 아래로 쭉 내리면 `Public over SSH` 항목이 있습니다. 여기서 `SSH Servers` 추가 버튼을 눌러줍니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 20.png)

위와 같이 내용을 채워 넣어 주고 고급을 눌러

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 21.png)

Key 부분에 EC2 서버 제공받은 .pem 파일의 키를 넣어줍니다.

✨키를 넣고 Test Configuration이 오류나 난다면, ubuntu 버전이 18.xx 버전보다 높은 경우에 pem 키로 인증이 실패하는 경우가 있습니다. 이 경우에는 Pem 키로 인증하는 것이 아닌, ubuntu 계정의 비밀번호를 설정하여 연결하는 방법을 사용하면 해결됩니다.****

### **👉 SSH 연결 오류 해결 방법**

가장 먼저, root 계정 비밀번호를 설정해줍니다. 명령어는 `sudo passwd`입니다. 비밀번호는 공격이 어렵게 복잡하게 설정하는 것이 좋습니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 22.png)

비밀번호를 설정했으면 `su -` 명령어를 통해 root 계정으로 접속합니다. 이후, `passwd ubuntu` 명령어를 이용해 ubuntu 계정의 패스워드를 설정해줍니다. 이 역시 복잡한 패스워드가 좋습니다.(잘못하면 해킹당함)

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 23.png)

패스워드 설정이 완료되었습니다. 하지만, EC2에는 기본적으로 id,pw을 이용한 로그인이 차단되어있습니다. 이제 이를 해제해보겠습니다.

계속해서 root 계정으로 접속된 상태에서 `vim /etc/ssh/sshd_config` 명령어를 통해  `sshd_config` 파일을 열어줍니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 24.png)

그러면, 위 사진과 같이 vim 편집기가 열립니다. 이 때, 키보드를 이용하여 아래로 조금씩 내리면서 밑줄 친 부분을 찾습니다. `PasswordAuthentication`을 no에서 yes으로 바꾸고, `esc :wq` 를 통해서 저장해줍니다.

마지막으로 `service sshd reload` 명령어를 통해 sshd를 재시작해줍니다.

이제 다시 젠킨스로 돌아옵니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 25.png)

기존에 설정한 Key를 지우고 위의 password를 입력합니다.

이후 다시 `Test Configuration`버튼을 눌러보겠습니다. 성공적으로 된다면 저장을 누릅니다.

- 젠킨스 프로젝트 > 구성 > 빌드후 조치

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 26.png)

Name에 프로젝트 이름을 써주고 Source file은 아무거나 입력해도 괜찮습니다.

![Untitled](/exec/빌드 및 배포/Jenkins_Docker/Jenkins_Docker/Untitled 27.png)

```bash
#도커 이미지를 도커에 가져옴
sudo docker load < /jenkins/images_tar/django.tar
sudo docker load < /jenkins/images_tar/react.tar
sudo docker load < /jenkins/images_tar/spring.tar

#실행중인 컨테이너의 이름을 찾아 같은 이름이 있으면 컨데이너를 멈춤
if (sudo docker ps | grep "django"); then sudo docker stop django; fi 
if (sudo docker ps | grep "react"); then sudo docker stop react; fi
if (sudo docker ps | grep "spring"); then sudo docker stop spring; fi

#도커 이미지를 실행시켜줌 
# -d : 백그라운드 모드
# -p {localhost port}:{docker port}
# --rm : 컨테이너 종료시 삭제
# --name {container name} {image name} 해당 이름으로 이미지를 실행
sudo docker run -it -d --rm -p 8000:8000  --name django django
sudo docker run -it -d --rm -p 3000:3000  --name react react
sudo docker run -it -d --rm -p 8080:8080  --name spring spring

echo "Run testproject"
```

Exec command에 빌드 후 실행할 명령어를 입력해줍니다.

---

### Spring Dockerfile

```docker
FROM openjdk:8-jdk-alpine
WORKDIR /var/jenkins_home/workspace/ggotmari/backend

COPY build/libs/backend-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Django Dockerfile

```docker
FROM python:3.9.14
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/jre
ENV PYTHONUNBUFFERED 1  

RUN apt-get update && apt-get install -y g++ default-jdk

WORKDIR /var/jenkins_home/workspace/ggotmari/backend_django

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# RUN pip install gunicorn

# RUN python manage.py migrate --fake

# CMD ["gunicorn", "ggotmari.wsgi", "--bind", "0.0.0.0:8000"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

### React Dockerfile

```docker
FROM node:16.17.0 as build-stage
WORKDIR /var/jenkins_home/workspace/ggotmari/frontend/ggotmari
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#COPY --from=build-stage /var/jenkins_home/workspace/ggotmari/frontend/ggotmari/build /usr/share/nginx/html
#COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["npm", "start"]
```

---
