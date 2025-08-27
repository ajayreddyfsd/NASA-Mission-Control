const http = require("http"); // Built-in Node.js module to create a server
require("dotenv").config(); // Load environment variables from .env

const app = require("./app"); // Import Express app
const { mongoConnect } = require("./services/mongo"); // Function to connect to MongoDB
const { loadPlanetsData } = require("./models/planets.model"); // Function to load planets into DB
const { loadLaunchData } = require("./models/launches.model"); // Function to load launches into DB

const PORT = process.env.PORT || 8000; // Use port from .env or default 8000

const server = http.createServer(app); // Create HTTP server using Express app

// ---------------------------
// Function to start the server
// ---------------------------
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

// Call startServer to run everything
startServer();
