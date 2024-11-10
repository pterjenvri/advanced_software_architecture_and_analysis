import { NextApiRequest, NextApiResponse } from "next";
import RabbitMQService from "./RabbitMQService";
import DatabaseService from "./databaseService";
import { randomUUID } from "crypto";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const message: Message = req.body;
    const queue = 'agc_jobs';
    

    const url = 'amqp://guest:guest@localhost/';

    try {
        const rabbitMQService = await new RabbitMQService().setup();

        const uuid = randomUUID();
        message.messageId = uuid;
        console.log(JSON.stringify(message));
        await new DatabaseService().setup().query(`INSERT INTO logs (id, message, message_type, message_sent) VALUES ('${message.messageId}', '${message.message}', 'from_sending_to_receiving', ${Date.now()})`);

        const sent = await rabbitMQService.sendToQueue(message);

        if (sent) {
            console.log(`Message sent: ${message} to queue: ${queue}`);
        }
        else {
            console.log('Message send failed');
        }
        res.status(200).json(message);
    } catch (err) {
        console.error('Error in rabbitMQ', err);
        res.statusCode = 500;
        res.end();
    }
}