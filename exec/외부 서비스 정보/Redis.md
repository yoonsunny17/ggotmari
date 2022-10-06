# Redis

# **📌Django Redis**

django-redis 활용

---

**📌Django Redis** ✨Redis✨Django 설정✨문제상황 및 원인✨Redis 설치 (해결방안)Window 설치Linux 설치 (Ubuntu)✨redis-cli 명령어

### **✨Redis**

- key-value 형태로 비정형 데이터를 저장하고 관리
- 비관계형 데이터베이스 관리 시스템(DBMS)
- 다양한 데이터 구조 지원
    - strings, hashes, lists, sets, sorted sets, streams 등

### **✨Django 설정**

- django-redis 설치

```
$ pip install django-redis
```

- 설정

```
# <프로젝트>/settings.py

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://127.0.0.1:6379/1",  # 1번 DB 사용
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        }
    }
}
```

- 테스트 함수 작성

```
# views.py

from django.core.cache import cache
from rest_framework.response import Response

def test(request):
    cache.set('key', 'value', timeout=30)  # 지속시간 30초. 30초 뒤 삭제됨
    result = cache.get('key')
    return Response({'result': result})
```

- 주소 설정

```
# urls.py

urlpatterns = [
    path('test/', views.test),
]
```

### **✨문제상황 및 원인**

- 위 설정까지만 하고 될 것이라 생각했지만 오류 발생

```
redis.exceptions.ConnectionError: Error 10061 connecting to 127.0.0.1:6379. 대상 컴퓨터
에서 연결을 거부했으므로 연결하지 못했습니다.
[14/Aug/2022 01:41:39] "GET /api/v1/test/ HTTP/1.1" 500 119551
```

- redis를 설치해야 django-redis 사용 가능

### **✨Redis 설치 (해결방안)**

### **Window 설치**

- Github에서 파일 다운 & 설치

```
https://github.com/microsoftarchive/redis/releases
```

- 3.0.504 (Latest)
- Redis-x64-3.0.504.msi 다운
- 파일 실행하여 설치
- 정상적으로 설치되었는지 확인
- `redis-cli` 로 실행, `select <number>`로 DB 선택 가능

```
# cmd

C:\Users\LJS>netstat -an|findstr 6379
  TCP    0.0.0.0:6379           0.0.0.0:0              LISTENING
  TCP    [::]:6379              [::]:0                 LISTENING

C:\Users\LJS>redis-cli  # redis 실행
127.0.0.1:6379> PING
PONG  # 정상 설치
```

### **Linux 설치 (Ubuntu)**

- 설치에 앞서 apt-get 업데이트, 업그레이드

```
$ sudo apt-get update
$ sudo apt-get upgrade
```

- redis-server 설치

```
$ sudo apt-get install redis-server
```

- 버전 확인

```
$ redis-server --version

Redis server v=5.0.7 sha=00000000:0 malloc=jemalloc-5.2.1 bits=64 build=66bd629f924ac924
```

- 메모리 설정에 앞서 서버의 메모리 확인

```
$ vmstat

procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 1  0      0 9256552 214776 6114212    0    0     0     9    6    2  0  0 100  0  0
```

- maxmemory 설정을 위해 redis.conf 파일 편집

```
$ sudo vim /etc/redis/redis.conf
```

- 수정해야하는 부분
    - maxmemory: redis가 최대로 사용할 메모리
    - maxmemory-policy: redis가 최대로 사용할 메모리를 초과했을 때 데이터를 삭제하는 방식 정의
- 일반모드에서 `/<검색할 단어>`를 입력하고 엔터
    - 아래 방향으로 검색 (위→아래)
        
        `?<검색할 단어>`: 위 방향으로 검색 (아래→위)
        
    - `n`을 누르면 다음 검색 결과로 이동
        
        `shift + n`: 이전 검색 결과로 이동
        
- maxmemory와 maxmemory-policy의 주석 부분을 편집
    - `i`를 누르면 입력 가능
    
    ```
    maxmemory 1g  # 최대 메모리 사용량 1G
    maxmemory-policy allkeys-lru  # 초과시 오래된 데이터를 지워서 메모리 확보
    ```
    
    - 편집이 끝나면 `Esc` + `:wq`
- Redis 재시작

```
$ sudo systemctl restart redis-server.service
```

### **✨redis-cli 명령어**

- 서버 접속

```
ubuntu@ip-172-26-12-69:~$ redis-cli
127.0.0.1:6379>
```

- 1번 DB 선택

```
127.0.0.1:6379> select 1
OK
127.0.0.1:6379[1]>
```

- 모든 key 검색

```
127.0.0.1:6379[1]> keys *
(empty list or set)  # 비어있는 경우

127.0.0.1:6379[1]> keys *
1) "aaa"
2) "bbb"
```

- 특정 key 검색

```
127.0.0.1:6379[1]> keys *a*
1) "aaa"
```

- 데이터 저장

```
127.0.0.1:6379[1]> set key value
OK
```

- 데이터 검색

```
127.0.0.1:6379[1]> get key
"value"
```