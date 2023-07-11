const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
/*
Here's what each of these options mean:

useNewUrlParser: true: 
This option uses the new URL parser instead of the deprecated one.
useCreateIndex: true: 
this option ensures that Mongoose uses the createIndex function instead of ensureIndex for index creation.
useFindAndModify: false
This option ensures that Mongoose uses the MongoDB driver's findOneAndUpdate instead of findAndModify method when executing update operations.
useUnifiedTopology: true: 
This option enables the use of the new MongoDB driver topology engine, which provides a better handling of replica sets and sharded clusters.
In summary, these configuration options are recommended to use with Mongoose when connecting to a MongoDB database to ensure that the connection is made using the latest best practices and to avoid potential deprecation warnings
*/
