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