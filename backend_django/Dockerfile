FROM python:3.9.14
WORKDIR /var/jenkins_home/workspace/ggotmari/backend_django
COPY requirements.txt ./

RUN pip install gunicorn
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
RUN python manage.py migrate --fake
CMD ["gunicorn", "ggotmari.wsgi", "--bind", "0.0.0.0:8000"]