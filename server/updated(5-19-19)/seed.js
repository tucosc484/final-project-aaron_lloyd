const MongoClient = require('mongodb').MongoClient;
//const URL = "mongodb+srv://sean:cosc484demo@cluster0-vdsaa.mongodb.net/test?retryWrites=true"
const URL = "mongodb+srv://ajorda18:COSC484@cosc457gp-gk4rw.azure.mongodb.net/test?retryWrites=true";

MongoClient.connect(URL, async (err, client) => {
  if (err) throw err;
  client.db().collection('')
  client.close();
});
