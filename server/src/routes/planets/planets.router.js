const express = require("express"); // Import Express.js so we can create routes

// Create a new router object from Express, to hold all the routes in this router
const planetsRouter = express.Router();

// Import the controller function that handles GET requests for planets
const { httpGetAllPlanets } = require("./planets.controller");

// Define a route for GET requests to '/' (e.g., '/planets')
// When someone visits this route, call the controller function
//! mapping the controller-function to a specifc-route
//! mapping the controller-function to a specifc-route
//! mapping the controller-function to a specifc-route
planetsRouter.get("/", httpGetAllPlanets);

// Export the router so it can be used in the main server file (app.js or index.js)
module.exports = planetsRouter;
