FROM python:3.9.15-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

RUN apt-get update \
    && apt-get -y install libpq-dev gcc postgresql

COPY requirements.txt /app/backend
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . /app/backend

ENTRYPOINT ["/app/backend/entrypoint.sh"]