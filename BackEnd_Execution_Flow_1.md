# How did we proceed to development

First, we wrote schemas for the MongoDB collection. inside `launches.mongo.js` and `planets.mongo.js`
The schema for the launches collection
and the schema for the planets collection

Then, we wrote the `mongo.js` file in the `services` folder, which we need to connect to MongoDB.
It has the `connect` and `disconnect` methods.

Then, just by putting the below codes in our model files (`launches.model.js` and `planets.model.js`),
we can use these collections as regular MongoDB collections and put all our mongoDB queries on them
`const planetsCollection = require("./planets.mongo");`
`const launchesCollection = require("./launches.mongo");`

# then

In the planets model, we put this code `const planetsCollection = require("./planets.mongo");` and started using this as usual mongoDB collection and then i loaded that "planets collection" using the CSV data.
And then we had some queries fetching the data directly from this MongoDB collection.

In the launches model, we put this code `const launchesCollection = require("./launches.mongo");` and started using this as usual mongoDB collection and then we got the data from the SpaceX API and then loaded that data into our "launch collection" after some filtering.
And then we had some queries fetching the data directly from this MongoDB collection.

So now the planets model and launches model are having a full ride on my MongoDB-db data.

All the router files come and merge in `app.js` or `api.js`.

# MVC Process

The process is MVC.
Of course, views are in the front end; if we need them in the backend, we might need to do `npm build`.
In models, we write all data-related code, like data and functions for accessing and editing data.
In controllers, we write two things: controllers and routers.
Controller functions actually send a response.
In the router file, we just map each route with a controller function; by each route, I also mean each of those `get`, `put`, `update`, `delete`, routes also.
Then in `api.js` or `app.js`, we get all those router files and create final endpoints again.
And finally in `server.js`, we use `app.js` or `api.js` to create the server.

# MVC Drill Down

Go to `server.js`.
Then go to `app.js` or `api.js`.
Then go to the specific router file in `app.js` or `api.js`.
Which takes you to a router file.
And in there again, choose your route and choose if you want `get` or `post` or `put` or `delete` or so on...
Which directs you to a specific controller function, which uses a model function inside it.

# As soon as server starts in server.js

-- `mongoConnect()` in `mongo.js` will run and establish a connection with the DB.
-- `loadPlanets()` in the planets-model file will run, sets up the "planets-collection", takes the data from the CSV and puts that into the "planets collection" inside the MongoDB DB.
-- `loadLaunches()` in the launches-model file will run, sets up the "launches-collection", asks SpaceX for data, then takes that data and stores it inside the "launches collection" in the MongoDB DB.
-- So basically, as soon as the server starts, the MongoDB connection is set up, MongoDB collections are setup and those collections are filled with data.
