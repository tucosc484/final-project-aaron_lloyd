import { MongoClient } from "mongodb";
import { OrdersDatastore } from "./datastore";
import * as express from 'express';
import * as morgan from 'morgan';
import { Request, Response } from 'express';

const bodyParser = require('body-parser');

OrdersDatastore
  .connect()
  .then((client: MongoClient) => {
    const ordersDatastore = new OrdersDatastore(client);
    startServer(ordersDatastore);
  });

function startServer(ordersDatastore: OrdersDatastore) {
  const app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const port = process.env.PORT || 3000;

  app.get('/users', async (request: Request, response: Response) => {
    const users = await ordersDatastore.readAllUsers();
    response.json({ users });
  });

  app.post('/users', async (request, response) => {
    const username = request.body.username;
    const password = request.body.password;
    const email = request.body.email;
    try {
      await ordersDatastore.createUser(username, password, email);
      response.sendStatus(201);
    } catch (error) {
      response.sendStatus(500);
    }
  });
    
  app.delete('/users/:id', async (request, response) => {
    const id = request.params.id;
    try {
      await ordersDatastore.deleteUser(id);
      response.sendStatus(204);
    } catch (error) {
      response.sendStatus(500);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
