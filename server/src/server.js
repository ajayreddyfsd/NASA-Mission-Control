require("dotenv").config(); // Load environment variables from .env

const { mongoConnect } = require("./services/mongo"); // Function to connect to MongoDB
const { loadPlanetsData } = require("./models/planets.model"); // Function to load planets into DB
const { loadLaunchData } = require("./models/launches.model"); // Function to load launches into DB

//! Use port from .env or default 8000
const PORT = process.env.PORT || 8000;

//! Built-in Node.js module to create a server
const http = require("http");

//$ Import Express app
//$ the app.js file
const app = require("./app");

//! Create HTTP server using the above Express app
const server = http.createServer(app);

//! Function to start the server
//! Function to start the server
//! Function to start the server
//! Function to start the server
//$ as soon as the server is started, i want these 3 functions to run
//$ so, if u want anything to run as soon as the server starts, put it here
async function startServer() {
  // 1. Connect to MongoDB
  await mongoConnect();

  // 2. Load planets data into MongoDB (if not already loaded)
  await loadPlanetsData();

  // 3. Load launches data into MongoDB (if not already loaded)
  await loadLaunchData();

  // 4. Start listening for HTTP requests
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

//! call the function to start the server
//! call the function to start the server
//! call the function to start the server
//! call the function to start the server
startServer();
