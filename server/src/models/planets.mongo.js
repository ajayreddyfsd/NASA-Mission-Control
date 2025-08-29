//$ in this code, we just define schema for the mongoDB db's "planets" collection
//$ in this code, we just define schema for the mongoDB db's "planets" collection
//$ in this code, we just define schema for the mongoDB db's "planets" collection
//$ in this code, we just define schema for the mongoDB db's "planets" collection

// bring in (import) mongoose library so we can talk to MongoDB
const mongoose = require("mongoose");

// make a "blueprint" (schema) for what a planet-doc looks like in our database's collection
const planetSchema = new mongoose.Schema({
  // every planet must have a name (we call it keplerName)
  keplerName: {
    type: String, // the name must be letters/text (not numbers)
    required: true, // this means the name cannot be empty, it's mandatory
  },
});

//! so each doc in the db's "planets" collection, must follow this schema.
//! below are some examples
// {
//   "_id": "64ff3a1d92e01b27eabc1234",
//   "keplerName": "Kepler-442 b"
// }
// {
//   "_id": "64ff3a1d92e01b27eabc5678",
//   "keplerName": "Kepler-22 b"
// }
// {
//   "_id": "64ff3a1d92e01b27eabc9999",
//   "keplerName": "Kepler-62 f"
// }

//! how do i know the collection name is "planets" ?
//! coz, we used "Planet" for the model in below code
//! which internally makes the collection name "planets"

// here we tell mongoose:
// "Please take the blueprint (planetSchema) and connect it to the collection (folder/table) by the name "planets" in the database.
// Planet = the model name we can use in code
// 'planets' = the actual collection in MongoDB
//$ we need to write "Planet" here, mDB converts it internally to "planets" which is the collection
module.exports = mongoose.model("Planet", planetSchema);

//! why connect it to collection?
//! coz usually, schmas in MongoDB are put for collections
//! so it oversees all the docs going inside
