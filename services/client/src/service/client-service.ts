import ClientRepository from '../database/repository/client-repository';

class ClientService {

    repository:ClientRepository;

    constructor() {
        this.repository = new ClientRepository();
    }

    GetClientList = async () => {
        const productList = await this.repository.GetClients();
        return productList;
    }
    
    ReceivePing = async (data:any) => {
        console.log('Your service just got pinged:');
        console.log(data);
    }

    HandlePayload = async (payload:any) => {
        const {event, data} = JSON.parse(payload);
        console.log(event);
        switch(event) {
            case 'PING':
                this.ReceivePing(data);
                break;
            default:
                break;
        }
    }
}

export default ClientService;