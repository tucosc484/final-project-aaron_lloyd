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
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


  //GET all Users, Groups, Posts
  app.get('/users', async (request: Request, response: Response) => {
    const users = await ordersDatastore.readAllUsers();
    response.json({ users });
  });

  app.get('/groups', async (request: Request, response: Response) => {
    const groups = await ordersDatastore.readAllGroups();
    response.json({ groups });
  });

  //returns all members for all created groups
  app.get('/groups/allmembers', async (request: Request, response: Response) => {
    const allGroupMembers = await ordersDatastore.readAllGroupMembers();
    response.json({ allGroupMembers });
  });
  
  app.get('/posts', async (request: Request, response: Response) => {
    const posts = await ordersDatastore.readAllPosts();
    response.json({ posts });
  });

  app.get('/groups/largest', async (request: Request, response: Response) => {
    const largestGroup = await ordersDatastore.getHighestPopulationGroup();
    response.json({ largestGroup });
  });

  app.get('/groups/topthree', async (request: Request, response: Response) => {
    const threeLargestGroups = await ordersDatastore.topThreeLargestGroups();
    response.json({ threeLargestGroups });
  });
  
  app.get('/groups/groupmembers', async (request: Request, response: Response) => {
    const groupName = request.body.title; 
    const membersOfGroup = await ordersDatastore.readGroupMembers(groupName);
    response.json({ membersOfGroup });
  });

  app.get('/posts/top', async (request: Request, response: Response) => {
    const topFivePost = await ordersDatastore.mostPopularPosts();
    response.json({ topFivePost });
  });


  //Create new User, Group, Post
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

  app.post('/groups', async (request, response) => {
    const title = request.body.title;
    const description = request.body.description;
    const creator = request.body.creator;
    const population = 1; //new Groups have a population of 1 (the creator)
    try {
      await ordersDatastore.createGroup(title, description, creator, population);
      response.sendStatus(201);
    } catch (error) {
      response.sendStatus(500);
    }
  });

  app.post('/posts', async (request, response) => {
    const title = request.body.title;
    const content = request.body.content;
    const author = request.body.author;
    try {
      await ordersDatastore.createPost(title, content, author);
      response.sendStatus(201);
    } catch (error) {
      response.sendStatus(500);
    }
  });

  //POST new topic
    

  //Delete User, Group, Post
  app.delete('/users/:id', async (request, response) => {
    const id = request.params.id;
    try {
      await ordersDatastore.deleteUser(id);
      response.sendStatus(204);
    } catch (error) {
      response.sendStatus(500);
    }
  });


  //PUT or UPDATE or PATCH Functions to update documents
  
  //Join a Group

  //Edit Profile

  //Add replies/comments to topics(?)

  //Like a post
  app.patch('/posts/like/:id', async (request, response) => {
    const id = request.params.id; 
    try {
      await ordersDatastore.likePost(id);
      response.sendStatus(200);
    } catch (error) {
      response.sendStatus(500);
    }
  });

  //Dislike a post
  app.patch('/posts/dislike/:id', async (request, response) => {
    const id = request.params.id; 
    try {
      await ordersDatastore.dislikePost(id);
      response.sendStatus(200);
    } catch (error) {
      response.sendStatus(500);
    }
  });


}
