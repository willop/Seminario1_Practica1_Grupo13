FROM python:3

WORKDIR /app

RUN pip install flask
RUN pip install -U flask-cors
RUN pip install boto3
RUN pip install -U pip
RUN pip install pymssql

COPY . .

EXPOSE 5000

CMD [ "python", "./app.py" ]