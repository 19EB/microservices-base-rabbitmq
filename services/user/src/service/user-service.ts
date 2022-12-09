import UserRepository from '../database/repository/user-repository';

class UserService {

    repository:UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    GetUserList = async () => {
        const userList = await this.repository.GetUsers();
        return userList;
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

export default UserService;