// Import Express.js so we can create routes
const express = require("express");

// Create a new router object from Express
// This router will hold all routes related to launches
const launchesRouter = express.Router();

// Import controller functions that handle requests for launches
const {
  httpGetAllLaunches, // GET all launches
  httpAddNewLaunch, // POST a new launch
  httpAbortLaunch, // DELETE (abort) a launch by id
} = require("./launches.controller");

// Define a GET route for '/' (e.g., '/launches')
// When someone visits this URL, call httpGetAllLaunches
launchesRouter.get("/", httpGetAllLaunches);

// Define a POST route for '/' to add a new launch
launchesRouter.post("/", httpAddNewLaunch);

// Define a DELETE route for '/:id' to abort a specific launch
launchesRouter.delete("/:id", httpAbortLaunch);

// Export the router so it can be used in the main server file
module.exports = launchesRouter;
