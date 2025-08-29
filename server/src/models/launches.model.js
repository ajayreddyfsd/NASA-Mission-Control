// Importing necessary tools
const axios = require("axios"); // Tool for making api requests like fetch()
const launchesCollection = require("./launches.mongo"); // Our database-collection for storing launches, lets us access launches-collection inside the DB.
const planetsCollection = require("./planets.mongo"); // Our database-collection for storing planets, lets us access planets-collection inside the DB.

// If we don't have any launches yet, we'll start counting from flight number 100
const DEFAULT_FLIGHT_NUMBER = 100;

// This is the website address where we can get SpaceX launch data
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

//! This function gets the complete launch data from SpaceX's website
//! This function gets the complete launch data from SpaceX's website
//! This function gets the complete launch data from SpaceX's website
//! This function gets the complete launch data from SpaceX's website
//! This function gets the complete launch data from SpaceX's website
async function populateLaunches() {
  console.log("Downloading launch data...");

  // Ask SpaceX's website for all their launch data
  //! we are getting the data, but why r we using post
  //! coz this how spaceX wants, we post query-for-data to get-the-data
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

  // Get the actual launch information from the response sent back by the API
  const launchDocs = response.data.docs;

  //! for-loop to Look at each launch one by one
  //! for-loop to Look at each launch one by one
  //! for-loop to Look at each launch one by one
  // each launchDoc may look like this
  // {
  //   "flight_number": 101,
  //   "name": "Starlink 15",
  //   "date_local": "2020-10-24T11:31:00-04:00",
  //   "upcoming": false,
  //   "success": true,
  //   "rocket": {
  //     "name": "Falcon 9"
  //   },
  //   "payloads": [
  //     { "customers": ["SpaceX"] },
  //     { "customers": ["NASA"] }
  //   ],
  //   "other_fields": "…",
  //   "another_field": "…"
  // }

  for (const launchDoc of launchDocs) {
    // Get the list of customers who paid for this launch
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    // Create a simpler version of the launch data that we want to store in our launches-collection
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers,
    };

    // Show us which launch we're processing
    console.log(`${launch.flightNumber} ${launch.mission}`);

    //? save each launchDoc into the launches-collection one by one
    await saveLaunch(launch);
  }
}

//! This function loads launch data into our app
async function loadLaunchData() {
  // Check if we already have the first SpaceX launch in our database using findLaunch()
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

//! This function looks for a launch in our database based on the filter
async function findLaunch(filter) {
  return await launchesCollection.findOne(filter); // Finds one launch that matches the filter
}

//! This function checks if a specific launch exists in our database
//! but not by using find() but by using the function findLaunch()
async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId, // Look for this flight number
  });
}

//! This function finds the highest flight number we have
async function getLatestFlightNumber() {
  // Look at all launch-docs and sorts them to find the newest one
  const latestLaunch = await launchesCollection.findOne().sort("-flightNumber"); // Sort from highest to lowest flight number

  // If we don't have any launches yet, use the default number
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  // Return the highest flight number we found
  return latestLaunch.flightNumber;
}

//! This function gets all the launch-docs from the launchesCollection inside our database
async function getAllLaunches(skip, limit) {
  // Get launches but skip some and only take a certain number
  return await launchesCollection
    .find({}, { _id: 0, __v: 0 }) // get everything but do not include technical database fields
    .sort({ flightNumber: 1 }) // Sort from oldest to newest based on flightNumber
    .skip(skip) // Skip this many launches (for paging)
    .limit(limit); // Only return this many launches
}

//! This function saves a launch-doc to our launchesCollection in the database
async function saveLaunch(launch) {
  try {
    await launchesCollection.updateOne(
      {
        flightNumber: launch.flightNumber, // find launch by its flight number
      },
      {
        $set: launch, // update all fields from the launch object
      },
      {
        upsert: true, // if not found, insert as a new document
      }
    );
  } catch (err) {
    console.error(`Could not save launch ${launch.flightNumber}: ${err}`);
  }
}

//! This function schedules a new launch by first checking if the launch-planet exists
//! if it does not exist, it throws an error
//! if it exists, we will prepare a launchDoc and add it to the LaunchesCollection
//! also, there is no such target-KV-pair in the launch doc. how?
//! this launch-obj is not like above, it is sent by user through form-submission, which looks like
// {
//   "mission": "Mars Exploration",
//   "rocket": "Falcon Heavy",
//   "launchDate": "2025-09-15",
//   "target": "Kepler-442 b"
// }
async function scheduleNewLaunch(launch) {
  // First check if the target planet exists in our database
  const planet = await planetsCollection.findOne({
    keplerName: launch.target, // Look for this planet
  });

  // If the planet doesn't exist, we can't go there!
  if (!planet) {
    throw new Error("No matching planet found");
  }

  // if the planet exists, we will prepare a launch doc and add it to LaunchesCollection
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

//! This function cancels a launch but not by deleting the launchDoc from the launchesCollection,
//! but by updating its KV pairs
async function abortLaunchById(launchId) {
  // Find the launch and mark it as not upcoming and not successful
  const aborted = await launchesCollection.updateOne(
    {
      flightNumber: launchId, // Find this specific launch
    },
    {
      upcoming: false, // It's not going to happen
      success: false, // It wasn't successful (because it was cancelled)
    }
  );

  // Tell us if we successfully cancelled the launch
  // rememer we get back an acknowledgement-json-object once something is done
  // modifiedCount is the KV pair of that specific json object
  return aborted.modifiedCount === 1;
}

//! Make these functions available to other parts of our app
module.exports = {
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
