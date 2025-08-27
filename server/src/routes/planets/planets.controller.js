//$ just a controller-file with some controller-functions
//$ we gonna map these controller-functions with specifc routes in the router-file later

// Import the function that gets all planets from the database
const { getAllPlanets } = require("../../models/planets.model");

// Controller function to handle HTTP GET requests for all planets
async function httpGetAllPlanets(req, res) {
  // Call the model function to get all planet docs
  const planets = await getAllPlanets();

  // Send back a 200 OK response with the planet data in JSON format
  // same as res.json() but we just added status
  return res.status(200).json(planets);
}

// Export the controller function so it can be used in routes
module.exports = {
  httpGetAllPlanets,
};
