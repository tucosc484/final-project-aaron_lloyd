import { Collection, MongoClient, ObjectId, Decimal128, FilterQuery } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGO_CONNECTION || '';

export class OrdersDatastore {
  users: Collection;
  groups: Collection;
  posts: Collection;

  constructor(client: MongoClient) {
    this.users = client.db().collection('users');
    this.groups = client.db().collection('groups');
    this.posts = client.db().collection('posts');
  }
  
  static async connect() {
    return new Promise<MongoClient>((resolve, reject) =>
      MongoClient.connect(URL, async (err: Error, client: MongoClient) => {
        if (err) {
          reject(err);
        }
        resolve(client);
      }));
  }

  //Retrieve all User, Group, Post
  async readAllUsers() {
    return await this.users.find({}).toArray();
  }

  async readAllGroups() {
    return await this.groups.find({}).toArray();
  }

  async readAllGroupMembers() {
    var groups = await this.groups.find({}).toArray(); 

    // var allMembers = groups.map(function(group) {
    //   return {"members": group.members, "title": group.title};
    // }) 
    // console.log(allMembers);

    const allGroupsMembers = groups.map( x => { 
      x.title + ": " + x.members
    }); 
    console.log(allGroupsMembers); 
  }

  async getHighestPopulationGroup() {
    var largestGroup = await this.groups.find().sort({population:-1}).limit(1).toArray(); //sorts groups and returns one with the highest number
    var largestGroupTitle = largestGroup[0].title; //assigns title attribute from JSON to variable
    
    return largestGroupTitle; //return largest group's title name
    
    //console.log(largestGroupTitle + " is currently the largest group"); //Output testing
  }

  async topThreeLargestGroups() {
    var threeLargestGroups = await this.groups.find().sort({population:-1}).limit(3).toArray();
    
    var topThree = [
      threeLargestGroups[0].title,
      threeLargestGroups[1].title,
      threeLargestGroups[2].title
    ]; 

    return topThree; //returns array of the titles of the three largest groups

    //Output testing
    // console.log(" Three Largest Groups ");
    // console.log("----------------------");
    // var z = 0;
    // var groupPop, groupTitle; 
    // while(z < threeLargestGroups.length) {
    //   groupPop = threeLargestGroups[z].population;
    //   groupTitle = threeLargestGroups[z].title;
    //   console.log(groupTitle + " group, " + groupPop + " members");
    //   z++;
    // }
  }

  async readGroupMembers(groupName: string) {
    var groupSpecified = await this.groups.find({"title":groupName}).toArray(); //returns JSON object of specified group

    var membersList = groupSpecified[0].members.toString().split(",");//takes members value within JSON Object and assigns its value into a string array
    //console.log(membersList);   //Output testing
    return membersList; //returns array of the specified group's members
  }

  async readAllPosts() {
    return await this.posts.find({}).toArray();
  }




  //Create new User, Group, Post
  async createUser(username: string, password: string, email: string) {
    await this.users.insertOne({ username, password, email });
  }

  async createGroup(title: string, description: string, creator: string, population: number) {
    await this.groups.insertOne({ title, description, creator, population });
  } 

  async createPost(title: string, content: string, author: string) {
    await this.posts.insertOne({ title, content, author });
  }


  //Delete User, Group, Post
  async deleteUser(id: string) {
    await this.users.deleteOne({ _id: new ObjectId(id) });
  }
}