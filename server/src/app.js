const path = require("path");
// Node.js module to work with file and folder paths safely across different operating systems

const express = require("express");
// Import Express framework to create a web server and handle routes

const cors = require("cors");
// Middleware to allow requests from different origins (like frontend and backend running on different ports)

const morgan = require("morgan");
// Middleware to log HTTP requests in the console (helps in debugging)

//! importing app.js's helper api.js
const api = require("./routes/api");
// Import our API routes (planetsRouter, launchesRouter) as a single router

// Create an Express application instance
const app = express();

//! Middleware
//! Middleware
//! Middleware
//! Middleware
//! usually cors means any URL, but here we are limiting the CORS to this specific URL. thats it
//! if we had multiple clients or front-ends, then we put all those here
app.use(cors({ origin: "http://localhost:3000" }));
// Enables CORS (Cross-Origin Resource Sharing) so that the frontend running on port 3000
// can make requests to this backend which is running on 8000, a different port.
// Without this, the browser would block requests from a different origin.

app.use(morgan("combined"));
// Logs every incoming HTTP request to the console in a detailed format, including method (GET/POST), URL, status code, response time, and more. Useful for debugging and monitoring traffic.

app.use(express.json());
// Automatically parses incoming request bodies with JSON content type and makes the data available as req.body in your routes.

app.use(express.static(path.join(__dirname, "../../client/public")));
// Serves static files (like index.html, CSS, JS, images) from the React app's public folder.
// __dirname points to server/src, so we go up two levels to reach client/public.
// This allows visiting your site in a browser without hitting the API first.

//! API routes
//! instead of writing routes here, we wrote in api.js and used it here
//! Mount all API routes under /v1
//! which means, we need to use "http://localhost:8000/v1" as the api-url in the frontend
//! especially in front-end's requests.js file in utils
app.use("/v1", api);

//! so for all other routes, just send this file
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/public/index.html")); // Serve React app
});

// Export Express app
module.exports = app;
