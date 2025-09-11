// Import functions from model-file that interact with the launches-collection
const {
  getAllLaunches, // Get all launches with optional pagination
  scheduleNewLaunch, // Add a new launch
  existsLaunchWithId, // Check if a launch exists by flight number
  abortLaunchById, // Cancel (abort) a launch by flight number
} = require("../../models/launches.model");

// Import the pagination helper
const { getPagination } = require("../../services/query");

//! -------------------------
//! Controller function to GET all launches
//! -------------------------
async function httpGetAllLaunches(req, res) {
  // Get skip & limit for pagination from query params
  const { skip, limit } = getPagination(req.query);

  // Get launches from DB with pagination
  const launches = await getAllLaunches(skip, limit);

  // Return launches as JSON with 200 OK
  // bacially res.json() but we are including status too
  return res.status(200).json(launches);
}

//! -------------------------
//! Controller function to POST (add) a new launch
//! lauch-data to add is in the request-object
//! -------------------------
async function httpAddNewLaunch(req, res) {
  const launch = req.body; // Get launch data sent by client through form

  // Validate required properties, if any missing data, raise error
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error:
        "Missing required launch property - must be 4: mission, rocket, lauchDate, target",
    });
  }

  // Convert launchDate to Date object and validate
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  // Save the new launch to DB
  await scheduleNewLaunch(launch);

  // Return the new launch as JSON with 201 Created
  return res.status(201).json(launch);
}

//! -------------------------
//! Controller function to DELETE (abort) a launch
//! -------------------------
async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id); // Get flight number from URL

  // Check if the launch exists
  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }

  // Try to abort the launch
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted! try again!",
    });
  }

  // Return success
  return res.status(200).json({
    ok: true,
  });
}

//! Export controller functions for the router to use
module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
