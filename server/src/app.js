const path = require("path"); // Helps build file paths safely across OS (Windows, Mac, Linux)
const express = require("express"); // Import Express.js framework
const cors = require("cors"); // To allow cross-origin requests (frontend & backend on different ports)
const morgan = require("morgan"); // Logs HTTP requests in the console
const api = require("./routes/api"); // Import all API routes (planets, launches, etc.)

// Create an Express application
const app = express();

//! ---------------------------
//! Middleware
//! ---------------------------
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from this frontend
  })
);

app.use(morgan("combined")); // Log HTTP requests in 'combined' format

app.use(express.json()); // Parse incoming JSON request bodies automatically
app.use(express.static(path.join(__dirname, "../../client/public"))); // Serve static files from the public folder (HTML, JS, CSS, images)

//! ---------------------------
//! API routes
//! ---------------------------
app.use("/v1", api); // Prefix all API routes with /v1, e.g., /v1/planets, /v1/launches

//! ---------------------------
//! Catch-all route for SPA (Single Page Application)
//! ---------------------------
app.get("/*", (req, res) => {
  // If route not found in API, send the frontend's index.html (React app)
  res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = app; // Export app to be used in server.js
