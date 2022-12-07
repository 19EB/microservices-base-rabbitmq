import express, { Response, Request } from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import config from './config';

const app = express();

app.use(cors());
app.use(express.json());

// Proxying all microservices
app.use('/user', proxy(config.USER_SERVICE_URL));
app.use('/client', proxy(config.CLIENT_SERVICE_URL));
app.use('/product', proxy(config.PRODUCT_SERVICE_URL));

app.use('/', (req:Request, res:Response) => {
    return res.status(200).json({msg: 'No endpoint specified'});
})

app.listen(config.PORT, ()=>{
    console.log(`Gateway running at port ${config.PORT}`);
}).on('error', (err:Error) => {
    console.log(err);
    process.exit();
});