FROM python:3.13

ADD agc.py .

RUN pip install pika psycopg2 python-dotenv

CMD ["python", "-u", "agc.py"]