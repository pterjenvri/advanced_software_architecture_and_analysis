import amqp, { Channel, Connection } from "amqplib";

export default class RabbitMQService {
    private connection!: Connection;
    private channel!: Channel;
    private queueName = 'agc-jobs';

    public async setup() {
        console.log(`${this.connection}, ${this.channel}`);
        if (!this.connection || !this.channel) {
            await this.initializeService();
        }
        return this;
    }

    private async initializeService() {
        try {
            await this.initializeConnection();
            await this.initializeChannel();
            await this.initializeQueues();
        } catch (err) {
            console.log(err);
        }
    }

    private async initializeConnection() {
        try {
            this.connection = await amqp.connect("amqp://guest:guest@localhost/")
            console.log('Connected to RabbitMQ server');
        } catch (err) {
            throw err;
        }
    }

    private async initializeChannel() {
        try {
            this.channel = await this.connection.createChannel();
            console.log('RabbitMQ channel created');
        } catch (err) {
            throw err;
        }
    }

    private async initializeQueues() {
        try {
            await this.channel.assertQueue(this.queueName, {
                durable: true,
            });
            console.log('Initialized RabbitMQ Queues');
        } catch (err) {
            throw err;
        }
    }

    public async sendToQueue(message: Message) {
        const sent = this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)), {
            persistent: true
        });
        console.log(`Message sent: ${message} to queue: ${this.queueName}`);
        await this.channel.close();
        await this.connection.close();
        return sent;
    }
}