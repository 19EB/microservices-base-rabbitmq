import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
    const cfg = `./.env.${process.env.NODE_ENV}`;
    dotenv.config({path: cfg});
}else {
    dotenv.config();
}

export default {
    PORT: process.env.PORT,
    SECRET: process.env.SECRET,
    DB: process.env.DB,
    CLIENT_SERVICE_URL: process.env.CLIENT_SERVICE_URL || '',
    USER_SERVICE_URL: process.env.USER_SERVICE_URL || '',

    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL || '',
    EXCHANGE_NAME: process.env.EXCHANGE_NAME || '',
    QUEUE_NAME: process.env.QUEUE_NAME || '',

    CLIENT_ROUTING_KEY: process.env.CLIENT_ROUTING_KEY || '',
    USER_ROUTING_KEY: process.env.USER_ROUTING_KEY || '',
    PRODUCT_ROUTING_KEY: process.env.PRODUCT_ROUTING_KEY || '',
}