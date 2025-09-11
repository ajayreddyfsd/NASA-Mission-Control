### how did we proceed to coding

first, we wrote schemas for the MongoDB collection.
the schema for the launches collection
and the schema for the planets collection

then, we wrote the `mongo.js` file in the `services` folder, which we need to connect to MongoDB.
it has the `connect` and `disconnect` methods.

then, just by putting these in our model code, we can use the MongoDB collections.
`const planetsCollection = require("./planets.mongo");`
`const launchesCollection = require("./launches.mongo");`

in the planets model, we used it to load the planets collection using the CSV data.
and then we had some queries fetching the data from this MongoDB collection.

in the launches model, we got the data from the SpaceX API and then loaded it into our launch collection after some filtering.
and then we had some queries fetching the data from this MongoDB collection.

so now the planets model and launches model are having a full ride on my MongoDB-db data.

all the router files come and merge in `app.js` or `api.js`.

### MVC Process

the process is MVC.
of course, views are in the front end; if we need them in the backend, we might need to do `npm build`.
in models, we write all data-related code, like data and functions for accessing and editing data.
in controllers, we write two things: controllers and routers.
controller functions actually send a response.
in the router file, we just map each route with a controller function; by each route, I also mean each of those `get`, `put`, `update`, `delete`, routes also.
then in `api.js` or `app.js`, we get all those router files and create final endpoints again.
and finally in `server.js`, we use `app.js` or `api.js` to create the server.

### MVC Drill Down

go to `server.js`.
then go to `app.js` or `api.js`.
then go to the specific route in `app.js` or `api.js`.
which takes you to a router file.
and in there again, choose your route and choose if you want `get` or `post` or `put` or `delete` or so on...
which directs you to a specific controller function, which uses a model function inside it.

### As soon as server starts in server.js

--`mongoConnect()` in `mongo.js` will run and establish a connection with the DB.
--`loadPlanets()` in the planets-model file will run, takes the data from the CSV and puts that into the planets-collection inside the MongoDB DB.
--`loadLaunches()` in the launches-model file will run, asks SpaceX for data, then takes that data and stores it inside the launches-collection in the MongoDB DB.
--so basically, as soon as the server starts, the MongoDB connection is set up and collections are filled with data.
