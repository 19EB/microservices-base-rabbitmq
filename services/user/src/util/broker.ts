import amqplib, { Channel, ConsumeMessage } from 'amqplib';
import config from '../config';
import UserService from '../service/user-service';

const MESSAGE_BROKER_URL = config.MESSAGE_BROKER_URL;
const EXCHANGE_NAME = 'MICROSERVICES-BASE';
const QUEUE_NAME = 'USER-QUEUE';
const ROUTING_KEY = 'USER-ROUTING-KEY';

export const CreateChannel = async () => {
    try {
        
        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'direct');
        
        return channel;
    }catch(err) {
        throw err;
    }
}

export const PublishMessage = async (channel:Channel, routing_key:string, message:any) => {
    console.log('Message published');
    try {
        channel.publish(EXCHANGE_NAME, routing_key, Buffer.from(message));
    }catch(err) {
        console.log(err);
    }
}

export const SubscribeMessage = async (channel:Channel, service:UserService) => {
    const queue = await channel.assertQueue(QUEUE_NAME);
    channel.bindQueue(queue.queue, EXCHANGE_NAME, ROUTING_KEY);
    channel.consume(queue.queue, (data:ConsumeMessage | null) => {
        if(data) {
            console.log('Consumer received data');
            service.HandlePayload(data.content.toString());
            channel.ack(data);
        }
    });
}