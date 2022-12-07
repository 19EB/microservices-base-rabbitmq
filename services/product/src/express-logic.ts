import express, { Express, Request, Response, NextFunction } from "express";
import cors from 'cors';
import ProductAPI from "./api/product-api";
import { Channel } from "amqplib";

const ExpressLogic = async (app:Express, channel:Channel) => {

    app.use(express.json({ limit: '1mb' }));
    app.use(cors());

    ProductAPI(app, channel);

    app.use('/', (req:Request, res:Response, next:NextFunction)=>{
        return res.status(200).json({msg: 'Product service response'});
    });
    
}

export default ExpressLogic;