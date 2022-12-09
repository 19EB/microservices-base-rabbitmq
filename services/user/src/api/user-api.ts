import { Channel } from "amqplib";
import { Express, NextFunction, Request, Response } from "express"
import UserService from "../service/user-service";
import { SubscribeMessage, PublishMessage } from "../util/broker";

const UserAPI = (app:Express, channel:Channel) => {

    const userService = new UserService();

    SubscribeMessage(channel,userService);

    app.get('/list', async (req:Request, res:Response, next:NextFunction) => {
        const result = await userService.GetUserList();
        return res.status(200).json({result});
    });

    app.get('/ping-client', async (req:Request, res:Response, next:NextFunction) => {
        const payload = {
            event: 'PING',
            data: { msg: 'Hello from user service'}
        }
        PublishMessage(channel, 'CLIENT-ROUTING-KEY', JSON.stringify(payload));
        return res.status(200).json({msg: 'Pinged client service'});
    });

    app.get('/ping-product', async (req:Request, res:Response, next:NextFunction) => {
        const payload = {
            event: 'PING',
            data: { msg: 'Hello from user service'}
        }
        PublishMessage(channel, 'PRODUCT-ROUTING-KEY', JSON.stringify(payload));
        return res.status(200).json({msg: 'Pinged product service'});
    });

}

export default UserAPI;