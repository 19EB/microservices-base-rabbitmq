import ProductRepository from '../database/repository/product-repository';

class ProductService {

    repository:ProductRepository;

    constructor() {
        this.repository = new ProductRepository();
    }

    GetProductList = async () => {
        const productList = await this.repository.GetProducts();
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

export default ProductService;