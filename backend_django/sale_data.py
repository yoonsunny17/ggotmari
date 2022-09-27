import pymysql
from datetime import *
from dateutil.relativedelta import *
import my_settings
import redis

# 최근 일주일의 판매량에 따른 점수 계산

conn = pymysql.connect(host='43.201.16.227', port=3306, user='ggotmari', password=my_settings.mysql_password, db='ggotmari', charset='utf8')

cur = conn.cursor()

yesterday_raw = (datetime.now() + timedelta(days=-1))  # 2022-09-24
before_7days_raw = (datetime.now() + timedelta(days=-7))  # 2022-09-18

yesterday = yesterday_raw.strftime('%Y-%m-%d')  # 2022-09-24
before_7days = before_7days_raw.strftime('%Y-%m-%d')  # 2022-09-18

while True:

    sql = "select sum(sale_size) sale_size, subject_id from sale where DATE(sale_date) BETWEEN %s AND %s group by subject_id"
    vals = (before_7days, yesterday)
    cur.execute(sql, vals)

    result = cur.fetchall()

    for record in result:
        # print(record[0], record[1])  sum, id
        if int(record[0]) >= 10000:
            sale_point = 0.6

        elif int(record[0]) >= 5000:
            sale_point = 0.3
        
        elif int(record[0]) >= 1000:
            sale_point = 0.1

        with redis.StrictRedis(host='localhost', port=6379, db=2) as connect:  # 2번 db 사용
            connect.set(f'{yesterday}_{record[1]}', sale_point, 60)  # 어제날짜_품종id를 key로, 품종별 판매량을 value로 설정, 만료시간 60초
            data = connect.get(f'{yesterday}_{record[1]}')
            print(data)

    yesterday_raw += timedelta(days=-1)
    before_7days_raw += timedelta(days=-1)

    yesterday = yesterday_raw.strftime('%Y-%m-%d')  # 2022-09-24
    before_7days = before_7days_raw.strftime('%Y-%m-%d')  # 2022-09-18

    if yesterday == '2022-08-07':
        break

conn.close()
