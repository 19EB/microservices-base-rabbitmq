import axios from "axios"
import config from "../config"

export const PublishProductEvent = async (payload:{event:string, data:any}) => {
        axios.post(`${config.PRODUCT_SERVICE_URL}/events`, {payload}).catch(err => {
            console.log('Could not publish product event: ');
            console.log(err.toString());
        });
}

export const PublishClientEvent = async (payload:{event:string, data:any}) => {
    axios.post(`${config.CLIENT_SERVICE_URL}/events`, {payload}).catch(err => {
        console.log('Could not publish client event: ');
        console.log(err.toString());
    });
}