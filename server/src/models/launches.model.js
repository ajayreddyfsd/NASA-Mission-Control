// Importing necessary tools
const axios = require("axios"); // Tool for making internet requests
const launchesDatabase = require("./launches.mongo"); // Our database for storing launches
const planets = require("./planets.mongo"); // Our database for storing planets

// If we don't have any launches yet, we'll start counting from flight number 100
const DEFAULT_FLIGHT_NUMBER = 100;

// This is the website address where we can get SpaceX launch data
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

// This function gets launch data from SpaceX's website
async function populateLaunches() {
  console.log("Downloading launch data...");

  // Ask SpaceX's website for all their launch data
  const response = await axios.post(SPACEX_API_URL, {
    query: {}, // We're not filtering anything - we want all data
    options: {
      pagination: false, // Get everything at once, not in pages
      populate: [
        {
          path: "rocket", // Also get info about the rocket
          select: {
            name: 1, // But only the rocket's name
          },
        },
        {
          path: "payloads", // Also get info about what was carried
          select: {
            customers: 1, // But only who paid for it (customers)
          },
        },
      ],
    },
  });

  // If the website didn't give us what we wanted, show an error
  if (response.status !== 200) {
    console.log("Problem downloading launch data");
    throw new Error("Launch data download failed");
  }

  // Get the actual launch information from the response
  const launchDocs = response.data.docs;

  // Look at each launch one by one
  for (const launchDoc of launchDocs) {
    // Get the list of customers who paid for this launch
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    // Create a simpler version of the launch data that we want to keep
    const launch = {
      flightNumber: launchDoc["flight_number"], // Which flight number this is
      mission: launchDoc["name"], // The name of the mission
      rocket: launchDoc["rocket"]["name"], // Which rocket was used
      launchDate: launchDoc["date_local"], // When it launched
      upcoming: launchDoc["upcoming"], // Is it going to happen soon?
      success: launchDoc["success"], // Was it successful?
      customers, // Who paid for it
    };

    // Show us which launch we're processing
    console.log(`${launch.flightNumber} ${launch.mission}`);

    // Save this launch to our database
    await saveLaunch(launch);
  }
}

// This function loads launch data into our app
async function loadLaunchData() {
  // Check if we already have the first SpaceX launch in our database
  const firstLaunch = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });

  // If we already have it, don't download again
  if (firstLaunch) {
    console.log("Launch data already loaded!");
  } else {
    // If we don't have it, download from SpaceX
    await populateLaunches();
  }
}

// This function looks for a launch in our database
async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter); // Find one launch that matches
}

// This function checks if a specific launch exists in our database
async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId, // Look for this flight number
  });
}

// This function finds the highest flight number we have
async function getLatestFlightNumber() {
  // Look at all launches and sort them to find the newest one
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber"); // Sort from highest to lowest flight number

  // If we don't have any launches yet, use the default number
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  // Return the highest flight number we found
  return latestLaunch.flightNumber;
}

// This function gets all launches from our database
async function getAllLaunches(skip, limit) {
  // Get launches but skip some and only take a certain number
  return await launchesDatabase
    .find({}, { _id: 0, __v: 0 }) // Don't include technical database fields
    .sort({ flightNumber: 1 }) // Sort from oldest to newest
    .skip(skip) // Skip this many launches (for paging)
    .limit(limit); // Only return this many launches
}

// This function saves a launch to our database
async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber, // Find a launch with this flight number
    },
    launch,
    {
      // Update it with this new data
      upsert: true, // If it doesn't exist, create it
    }
  );
}

// This function schedules a new launch
async function scheduleNewLaunch(launch) {
  // First check if the target planet exists in our database
  const planet = await planets.findOne({
    keplerName: launch.target, // Look for this planet
  });

  // If the planet doesn't exist, we can't go there!
  if (!planet) {
    throw new Error("No matching planet found");
  }

  // Get the next flight number by adding 1 to the latest one
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  // Create the complete launch information
  const newLaunch = Object.assign(launch, {
    success: true, // Assume it will be successful
    upcoming: true, // It's scheduled for the future
    customers: ["Zero to Mastery", "NASA"], // Who's paying for it
    flightNumber: newFlightNumber, // The new flight number
  });

  // Save the new launch to our database
  await saveLaunch(newLaunch);
}

// This function cancels a launch
async function abortLaunchById(launchId) {
  // Find the launch and mark it as not upcoming and not successful
  const aborted = await launchesDatabase.updateOne(
    {
      flightNumber: launchId, // Find this specific launch
    },
    {
      upcoming: false, // It's not going to happen
      success: false, // It wasn't successful (because it was cancelled)
    }
  );

  // Tell us if we successfully cancelled the launch
  return aborted.modifiedCount === 1;
}

// Make these functions available to other parts of our app
module.exports = {
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
