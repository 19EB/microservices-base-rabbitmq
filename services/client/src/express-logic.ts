import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import ClientAPI from "./api/client-api";
import { Channel } from "amqplib";

const ExpressLogic = async (app:Express, channel:Channel) => {

    app.use(express.json({ limit: '1mb' }));
    app.use(cors());

    ClientAPI(app, channel);

    app.use('/', (req:Request, res:Response, next:NextFunction)=>{
        return res.status(200).json({msg: 'Client service response'});
    });
    
}

export default ExpressLogic;