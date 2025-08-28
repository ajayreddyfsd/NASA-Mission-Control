//! usually this shd be in app.js, but we are making a helper code for app.js in this api.js

const express = require("express");
// Import Express.js so we can create routers

const planetsRouter = require("./planets/planets.router");
// Import the planets router, which has all /planets endpoints

const launchesRouter = require("./launches/launches.router");
// Import the launches router, which has all /launches endpoints

const api = express.Router();
// Create a new Express router to group all our API routes under one router

api.use("/planets", planetsRouter);
// Mount the planetsRouter on /planets path
// All routes inside planetsRouter will now start with /planets
// Example: GET /planets → handled by planetsRouter

api.use("/launches", launchesRouter);
// Mount the launchesRouter on /launches path
// All routes inside launchesRouter will now start with /launches
// Example: POST /launches → handled by launchesRouter

module.exports = api;
// Export this router so app.js can import it and mount it with a prefix like /v1
