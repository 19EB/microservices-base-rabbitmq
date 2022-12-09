import { Channel } from "amqplib";
import { Express, NextFunction, Request, Response } from "express"
import ClientService from "../service/client-service";
import { PublishMessage, SubscribeMessage } from '../util/broker';

const ClientAPI = (app:Express, channel:Channel) => {

    const clientService = new ClientService();
    SubscribeMessage(channel, clientService);

    app.get('/list', async (req:Request, res:Response, next:NextFunction) => {
        const result = await clientService.GetClientList();
        return res.status(200).json({result});
    });

    app.get('/ping-product', async (req:Request, res:Response, next:NextFunction) => {
        const payload = {
            event: 'PING',
            data: { msg: 'Hello from client service'}
        }
        PublishMessage(channel, 'PRODUCT-ROUTING-KEY', JSON.stringify(payload));
        return res.status(200).json({msg: 'Pinged product service'});
    });

    app.get('/ping-user', async (req:Request, res:Response, next:NextFunction) => {
        const payload = {
            event: 'PING',
            data: { msg: 'Hello from client service'}
        }
        PublishMessage(channel, 'USER-ROUTING-KEY', JSON.stringify(payload));
        return res.status(200).json({msg: 'Pinged user service'});
    });

}

export default ClientAPI;