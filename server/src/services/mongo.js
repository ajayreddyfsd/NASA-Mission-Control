const mongoose = require("mongoose"); // Import mongoose so we can connect to MongoDB
require("dotenv").config(); // Load environment variables from .env file

//$ the small mongo URL is to store data in mongodb db, locally in the laptop
//$ the lengthy mongo url is to store data in mongodb db, but in cloud - the mongoDB Atlas, 
//$ but the lengthy URL needs username and password to access the cluster
//$ just toggle between which one you want to use

//! MongoDB connection string
//! MongoDB connection string
//! MongoDB connection string
// Normally you'd use: const MONGO_URL = process.env.MONGO_URL;
// For now, it's using a local MongoDB server:
const MONGO_URL = process.env.MONGO_URL;
// const MONGO_URL =
//   "mongodb+srv://<username>:<password>@nasamissioncontrol.7omztw3.mongodb.net/?retryWrites=true&w=majority&appName=NasaMissionControl";

//! basic functions to establish the mongoDB connection
//! basic functions to establish the mongoDB connection
//! basic functions to establish the mongoDB connection
// Function to connect to MongoDB
async function mongoConnect() {
  await mongoose.connect(MONGO_URL); // establishes the connection
}

//! basic function that tells us when the mongoDB connection is successfully established
//! basic function that tells us when the mongoDB connection is successfully established
//! basic function that tells us when the mongoDB connection is successfully established
// Event listener: runs once when the connection opens successfully
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

//! basic functions to remove the mongoDB connection
//! basic functions to remove the mongoDB connection
//! basic functions to remove the mongoDB connection
// Function to disconnect from MongoDB
async function mongoDisconnect() {
  await mongoose.disconnect(); // closes the connection
}

//! basic function to tell us everytime there is an error on the mongoDB connection
//! basic function to tell us everytime there is an error on the mongoDB connection
//! basic function to tell us everytime there is an error on the mongoDB connection
// Event listener: runs every time an error happens on the connection
mongoose.connection.on("error", (err) => {
  console.error(err);
});

//! Export the connect and disconnect functions so other files can use them
module.exports = {
  mongoConnect,
  mongoDisconnect,
};
