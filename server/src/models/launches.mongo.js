//$ in this code, we just define schema for the mongoDB db's "launches" collection
//$ in this code, we just define schema for the mongoDB db's "launches" collection
//$ in this code, we just define schema for the mongoDB db's "launches" collection
//$ in this code, we just define schema for the mongoDB db's "launches" collection

// bring in (import) mongoose library so we can talk to MongoDB
const mongoose = require("mongoose");

// make a "blueprint" (schema) for what a launch-doc looks like in our database's collection
const launchesSchema = new mongoose.Schema({
  // which number launch it is (like 1, 2, 3...)
  flightNumber: {
    type: Number, // must be a number
    required: true, // can't be empty
  },

  // when the rocket is launched
  launchDate: {
    type: Date, // must be a date (like 2025-08-27)
    required: true,
  },

  // name of the mission (example: "Starlink 15")
  mission: {
    type: String, // must be text
    required: true,
  },

  // name of the rocket used
  rocket: {
    type: String, // must be text
    required: true,
  },

  // where the rocket is going (example: "Kepler-442 b")
  target: {
    type: String, // must be text
    // not required → it can be empty
  },

  // list/array of customers (example: ["NASA", "SpaceX"])
  customers: [String], // means an array of strings

  // true if launch is in the future, false if already happened
  upcoming: {
    type: Boolean, // must be true/false
    required: true,
  },

  // true if launch worked, false if failed
  success: {
    type: Boolean, // must be true/false
    required: true, // must exist
    default: true, // if you don’t give a value, it will automatically be true
  },
});

//! so each doc in the db's "launches" collection, must follow this schema.
//! below are some examples
// {
//   "_id": "64ff3a1d92e01b27eabc1111",
//   "flightNumber": 101,
//   "launchDate": "2025-08-27T00:00:00.000Z",
//   "mission": "Mars Explorer",
//   "rocket": "Falcon Heavy",
//   "target": "Mars",
//   "customers": ["NASA", "SpaceX"],
//   "upcoming": true,
//   "success": true
// }
// {
//   "_id": "64ff3a1d92e01b27eabc2222",
//   "flightNumber": 102,
//   "launchDate": "2026-01-12T00:00:00.000Z",
//   "mission": "Lunar Cargo",
//   "rocket": "SLS",
//   "target": "Moon",
//   "customers": ["NASA"],
//   "upcoming": false,
//   "success": false
// }

//! how do i know the collection name is "launches" ?
//! coz, we used "Launch" for the model in below code
//! which internally makes the collection name "launches"

// here we tell mongoose:
// "Please take the blueprint (launchesSchema) and connect it to the collection (folder/table) by the name 'launches' in the database.
// Launch = the model name we can use in code
// 'launches' = the actual collection in MongoDB
module.exports = mongoose.model("Launch", launchesSchema);

//! why connect it to collection?
//! coz usually, schemas in MongoDB are put for collections
//! so it oversees all the docs going inside
