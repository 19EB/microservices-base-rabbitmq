import { Channel } from "amqplib";
import { Express, NextFunction, Request, Response } from "express"
import ProductService from "../service/product-service";
import { SubscribeMessage, PublishMessage } from "../util/broker";

const ProductAPI = (app:Express, channel:Channel) => {

    const productService = new ProductService();
    SubscribeMessage(channel, productService);

    app.get('/list', async (req:Request, res:Response, next:NextFunction) => {
        const result = await productService.GetProductList();
        return res.status(200).json({result});
    });

    app.get('/ping-client', async (req:Request, res:Response, next:NextFunction) => {
        const payload = {
            event: 'PING',
            data: { msg: 'Hello from product service'}
        }
        PublishMessage(channel, 'CLIENT-ROUTING-KEY', JSON.stringify(payload));
        return res.status(200).json({msg: 'Pinged client service'});
    });

    app.get('/ping-user', async (req:Request, res:Response, next:NextFunction) => {
        const payload = {
            event: 'PING',
            data: { msg: 'Hello from product service'}
        }
        PublishMessage(channel, 'USER-ROUTING-KEY', JSON.stringify(payload));
        return res.status(200).json({msg: 'Pinged user service'});
    });

}

export default ProductAPI;