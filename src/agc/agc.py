import pika
import time
import psycopg2
import json

pg_connection = psycopg2.connect(database="postgres", user="postgres", password="postgres", host="localhost", port=5432)
pg_cursor = pg_connection.cursor()
connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='agc-jobs', durable=True)
print(' [*] Waiting for messages. To exit press CTRL+C')


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    message_json = json.loads(body.decode('utf-8'))
    current_time_epoch = round(time.time()*1000)
    print("UPDATE logs SET message_received=" + str(current_time_epoch) + " WHERE id='" + message_json['messageId'] + "'")
    pg_cursor.execute("UPDATE logs SET message_received=" + str(current_time_epoch) + " WHERE id='" + message_json['messageId'] + "'")
    pg_connection.commit()
    time.sleep(body.count(b'.'))
    print(" [x] Done")
    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='agc-jobs', on_message_callback=callback)

channel.start_consuming()