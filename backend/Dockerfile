FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV docker=true

WORKDIR /backend

COPY requirements.txt /backend/
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
COPY . /backend/