FROM python:3.9.14
WORKDIR /var/jenkins_home/workspace/ggotmari/backend_django
COPY requirements.txt ./

CMD ["source", "venv", "bin", "activate"]
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "manage.py", "migrate", "--fake"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]