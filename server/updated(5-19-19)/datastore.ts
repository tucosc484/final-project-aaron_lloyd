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

  /*Gets Documents within Database Collection*/
  
  //retrieve all user JSON Objects in database
  async readAllUsers() {
    return await this.users.find({}).toArray();
  }
  
  //retrieve all group JSON Objects in database
  async readAllGroups() {
    return await this.groups.find({}).toArray();
  }
  
  //retrieve all group titles and their corresponding members in database
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
  
  //retrives group title of the group with largest population
  async getHighestPopulationGroup() {
    var largestGroup = await this.groups.find().sort({population:-1}).limit(1).toArray(); //sorts groups and returns one with the highest number
    var largestGroupTitle = largestGroup[0].title; //assigns title attribute from JSON to variable
    
    return largestGroupTitle; //return largest group's title name
    
    //console.log(largestGroupTitle + " is currently the largest group"); //Output testing
  }
  
  //returns array of group titles for the three largest groups
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
  
  //returns all members of a specified group
  async readGroupMembers(groupName: string) {
    var groupSpecified = await this.groups.find({"title":groupName}).toArray(); //returns JSON object of specified group

    var membersList = groupSpecified[0].members.toString().split(",");//takes members value within JSON Object and assigns its value into a string array
    //console.log(membersList);   //Output testing
    return membersList; //returns array of the specified group's members
  }

  //returns all post JSON Objects in database
  async readAllPosts() {
    return await this.posts.find({}).toArray();
  }
  //returns  post with the most amount of likes
  async mostPopularPosts() {
    var topFivePost = await this.posts.find().sort({likes:-1}).limit(5).toArray();
    
    var topFivePostList = [
      topFivePost[0].title,
      topFivePost[1].title,
      topFivePost[2].title,
      topFivePost[3].title,
      topFivePost[4].title
    ]; 

    return topFivePostList; //returns array of the titles of the five most liked posts
  }
 

  /*Creates Documents within Database Collection*/

  //create new user within database
  async createUser(username: string, password: string, email: string) {
    await this.users.insertOne({ username, password, email });
  }
  //creates new group within database
  async createGroup(title: string, description: string, creator: string, population: number) {
    await this.groups.insertOne({ title, description, creator, population });
  } 
  //creates new post within database
  async createPost(title: string, content: string, author: string) {
    await this.posts.insertOne({ title, content, author });
  }


  /*Updates Database Collection Documents*/
 
  //Increments the number of likes on a particular post
  async likePost(id: string) {
    await this.posts.update(
      { _id: new ObjectId(id) }, //specifies document to be updated
      { $inc: { likes: 1 } } //increments number of likes for that document by 1
    );
  }

  //Increments the numer of dislikes on a particular post
  async dislikePost(id: string) {
    await this.posts.update(
      { _id: new ObjectId(id) }, //specifies document to be updated
      { $inc: { dislikes: 1 } } //increments number of dislikes for that document by 1
    );
  }


  
  /*Deletes Database Collection Documents*/

  //Delete User, Group, Post
  async deleteUser(id: string) {
    await this.users.deleteOne({ _id: new ObjectId(id) });
  }

  
}
