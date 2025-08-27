// 'fs' = file system, lets us read/write files
const fs = require("fs");
// 'path' = helps build safe file paths for different OS (Windows, Mac, etc.)
const path = require("path");
// 'parse' = library that reads CSV files and turns them into JS objects
const { parse } = require("csv-parse");

//! this is our Planet model (from planets.mongo.js → schema we wrote earlier)
//! we need this to interact with the "planets" collection in MongoDB database
const planetsCollection = require("./planets.mongo");

//! this is a simple helper function that checks if a planet is habitable or not and returns true or false
//! "habitable" = confirmed, gets right amount of starlight, and not too big
//? the planet that is being passed to this function is an object which might looks like this
// {
//   kepler_name: "Kepler-442 b",
//   koi_disposition: "CONFIRMED",
//   koi_insol: "0.70",
//   koi_prad: "1.34",
//   koi_period: "112.3",
//   koi_smass: "0.80",
//   koi_sradius: "0.78"
// }
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" && // planet must be confirmed
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 && // right energy range
    planet["koi_prad"] < 1.6
  ); // radius smaller than 1.6 Earths
}

//$ this is node.js code and not express.js code
//! what is this is doing?
//! basically it is reading the entire csv-file as a stream and uses event-listeners like data, end, error
//! so takes each row in the csv_file, parses it to json object, checks if that planet is habitable
//! and only then, adds this planet-doc to the planets-collection one by one
//! so it is not collecting the data inside, but it is storing all of it in the db, thats why we have empty resolve() at the end
function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    // read the CSV file from "data/kepler_data.csv"
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )

      // pipe the stream into the CSV parser
      .pipe(
        parse({
          comment: "#", // ignore lines that start with '#'
          columns: true, // turn each row into a JS object with column names as keys
        })
      )

      // 'data' event runs for each row in the CSV file
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          //! if the planet passes the test → add this planet-doc to MongoDB db's planets-collection
          savePlanet(data);
        }
      })

      // if something goes wrong while reading/parsing
      .on("error", (err) => {
        console.log(err);
        reject(err); // reject the promise
      })

      // 'end' event runs when we reach the end of the file
      .on("end", async () => {
        // count how many planets we have in the DB now
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound} habitable planets found!`);
        resolve(); //! since this is not collecting all the data inside, but it is storing all of it in the db's planets-collection, thats why we have empty resolve() at the end, else we would have resolved with a value.
      });
  });
}

// function to get all planets from MongoDB database
//! this is a simple function that runs mongoDB's find() query with empty curly braces, to get all the docs inside the planets-collection
//! also, the second arg is for projection, that means we dont want _id and _v KV-pairs in the docs that u r gonna give us.
async function getAllPlanets() {
  return await planetsCollection.find(
    {},
    {
      _id: 0,
      __v: 0, // remove MongoDB's internal fields (_id, __v) from results
    }
  );
}

// function to save a planet into MongoDB
//! this is a simple function, that runs mongoDB's updateOne() query inside to add a new-document to the planets-collection
//! buy why updateOne() and not insertOne() ?
//! coz insertOne() may add duplicates.
//! but by using updateOne() with upsert=true,
//! if match is found, it updates it to the same thing, so no harm
//! if no match is found, it just inserts the document
//? the planet that is being passed to this function is an object which might looks like this
// {
//   kepler_name: "Kepler-442 b",
//   koi_disposition: "CONFIRMED",
//   koi_insol: "0.70",
//   koi_prad: "1.34",
//   koi_period: "112.3",
//   koi_smass: "0.80",
//   koi_sradius: "0.78"
// }
async function savePlanet(planet) {
  try {
    // updateOne = if planet exists → update it, if not → insert it (because of upsert: true)
    await planetsCollection.updateOne(
      {
        keplerName: planet.kepler_name, // find by planet name
      },
      {
        keplerName: planet.kepler_name, // set the planet name
      },
      {
        upsert: true, // if it doesn't exist, create a new doc
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

//! export functions so other files can use them
module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
