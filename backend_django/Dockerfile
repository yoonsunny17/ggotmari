FROM python:3.9.14
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/jre
ENV PYTHONUNBUFFERED 1  

RUN apt-get update && apt-get install -y g++ default-jdk
# RUN pip install konlpy

WORKDIR /var/jenkins_home/workspace/ggotmari/backend_django

COPY . .

# ENV PATH="./venv/bin:$PATH"

# COPY requirements.txt ./
RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# RUN python sale_data.py

# RUN pip install gunicorn
# COPY . .

# RUN python manage.py migrate --fake

# CMD ["gunicorn", "ggotmari.wsgi", "--bind", "0.0.0.0:8000"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]