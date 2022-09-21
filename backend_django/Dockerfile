FROM python:3.9.14
ENV PYTHONUNBUFFERED 1
WORKDIR /var/jenkins_home/workspace/ggotmari/backend_django

COPY . .

# ENV PATH="./venv/bin:$PATH"

# COPY requirements.txt ./
RUN pip install --upgrade pip

RUN pip install -r requirements.txt

RUN pip install gunicorn
COPY . .

RUN python manage.py migrate --fake

CMD ["gunicorn", "ggotmari.wsgi", "--bind", "0.0.0.0:8000"]