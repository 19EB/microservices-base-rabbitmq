import dotenv from 'dotenv';

if(process.env.NODE_ENV !== 'production') {
    const cfg = `./.env.${process.env.NODE_ENV}`;
    dotenv.config({path: cfg});
}else {
    dotenv.config();
}

export default {
    PORT: process.env.PORT,
    CLIENT_SERVICE_URL: process.env.CLIENT_SERVICE_URL || '',
    USER_SERVICE_URL: process.env.USER_SERVICE_URL || '',
    PRODUCT_SERVICE_URL: process.env.PRODUCT_SERVICE_URL || ''
}