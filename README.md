
  
# microservices-base-rabbitmq

Basic microservices project that includes a gateway (api-gateway) and 3 microservices (user/product/client) and a messaging queue

This variation utilizes RabbitMQ as the messaging queue so if one microservice goes down, it will receive messages when it gets back up.
  

### Prerequisites

  

- Install [Node.js](https://nodejs.org/en/)
- Install [RabbitMQ](https://www.rabbitmq.com/) or run it in a Docker container with the included compose file. Alternatively you can use their cloud solution at [CloudAMQP](https://www.cloudamqp.com/)

  

### Installing

- Clone the repository

```
git clone https://github.com/19EB/microservices-base
```

- Install dependencies on api-gateway

```
cd api-gateway

npm install
```
- Install dependencies on each microservice (user, product and client)
```
cd services/<microservice>

npm install
```

### Environment variables

This project uses the following environment variables:
##### api-gateway
```
# Port
PORT=8000

# User service
USER_SERVICE_URL='http://localhost:8001'

# Client service
CLIENT_SERVICE_URL='http://localhost:8002'

# Product service
PRODUCT_SERVICE_URL='http://localhost:8003'
```

##### microservice
```
# Database
DB=''

# Service port
PORT=8001

# RabbitMQ configuration (use local or cloud url here)
MESSAGE_BROKER_URL=''
```

### Running the project

- If you plan on using Docker for running RabbitMQ, I have included "rabbitmq" folder that contains the docker-compose file.

```
cd rabbitmq
docker-compose up -d
```

- Start each microservice from its own directory

Development mode
```
cd services/<microservice>

npm run dev
```
Production mode
```
cd services/<microservice>

npm start
```

- Start the api-gateway
```
cd api-gateway

npm start

or

npm run dev
```
Navigate to `http://localhost:8000`

### Endpoints

The project has couple endpoints to ping each other and one normal endpoint.

  

`http://localhost:8000/user/list`

`http://localhost:8000/user/ping-client`

`http://localhost:8000/user/ping-product`

  

`http://localhost:8000/client/list`

`http://localhost:8000/client/ping-user`

`http://localhost:8000/client/ping-product`

  

`http://localhost:8000/product/list`

`http://localhost:8000/product/ping-user`

`http://localhost:8000/product/ping-client`

  

## License

  

This project is licensed under the MIT License
