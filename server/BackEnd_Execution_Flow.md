first we wrote schemas for mdb collection
the shcema for launches coll
and schema for planets coll

then we wrote the mongo.js file in the services folder, which we need to connect to mongodb
it has the connect and disconnect methods

then just by putting these in our model code, we can use them mdb collections
const planetsCollection = require("./planets.mongo");
const launchesCollection = require("./launches.mongo");

in planets model, we used it load the planets collection using the csvdata
and then we had some queries fetching the data from this mdb collection

in the launches model, we got the data from spaceX api, and then loaded it into our launch coll after some filtering
and then we had some queries fetching the data from this mdb collection

so now planets model and launches model are having a full ride on my mdb-db data

all the router files come and merge in app.js or api.js

### how requests or data is getting from user clicks or front end all the way to back end and how are they getting fulfilled

1. how did the front end get data, the planets and launches
   --so usePlanets and useLaunches custom hooks are the one getting data. (which ofcourse is then loaded into Applayout-comp and passed to other comps)
   --but how?
   --by calling httpGetLaunches() and httpGetPlanets() insdie request.js which are actually hit the api-end-point with apt request method- "get here"
   --so the request is inid in custom hook, which travels to requests.js's file and then to the apt func and then it hits the api end point
   --backend takes it from here
   --the request, then goes to server.js, then to app.js, then to api.js,
   --then to the appropriate router file (based on "/launches" or "/planets") and
   --then to the appropriate route in the router file
   --and then to the controller func
   --now req is in the hands of controller func
   --it calls model, as it is the incharge of data,
   --and with the help of apt model func, gets data from db and fullfills the request.

2. how did form data pass to backend, the post req
   --so we collected data from form, then it hit the fucntion in onsubmit, which is submitLaunch()
   --submitLaunch() is inside custom hook useLaunches which internally uses requests.js's httpsubmitLaunch()
   --so the data is now with httpsubmitLaunch()
   --inside this func, we used the data to create a req object, and made a post req to the api url with endpoint POST: "/launches"
   --backend takes it from here
   --the data in the req-body, then goes to server.js, then to app.js, then to api.js,
   --then to the appropriate router file (here launches, coz api end point hit was "/launches" and it was post req)
   --then to the proper route in the router file
   --and finally data is passed into the controller fucntion
   --inside controller func, first data is extracted from req.body, and then it calls the apt model function (coz model is incharge of data)
   --and stores the data in the appropriate loc in db using the model function

3. how did abort post req, pass to backend
   --so as soon as i click X, onclick goes to abortLaunch() func by taking the launch-id with it (we need this id to delete the launch)
   --abortLaunch() is inside useLaucnhes custom hook
   --and the abortLaunch() inside that custom hook uses requests.js's function internally
   --so the id and the click now goe to requests.js's httpabortLaunch()
   --here it puts the id inside req.body, and raises a delete-req on apt end point
   --back end takes it from here,
   --the request, then goes to server.js, then to app.js, then to api.js,
   --then to the appropriate router file (based on "/launches" or "/planets") and
   --then to the appropriate route in the router file
   --and then to the controller func
   --now req is in the hands of controller func
   --it pulls out the id from req.body and calls model, as it is the incharge of data,
   --and with the help of apt model func, deletes the launch from the db using its id

### MVC process

the process is MVC
ofcourse views are in fe, if we need in be, we might need to do "npm build"
in models, we write all data related code, like data and func accessing and editing data
in controlllers, we write two - controllers and routers
controller functions actually send response
in router file, we just map each route with a controller ficntion, by each route i also mean each of those get, put, update, delete, ... routes also
then in api.js or app.js, we get all those router files, and create final endpoints again
and finally in server.js, we use app.js or api.js to create the server

### MVC drill down

go to server.js
then go to app.js or api.js
then go to the specific route in app.js or api.js
which takes u to a router file
and in there again, choose ur route and choose if u want get or post or put or delete or so on..
which directs u to specific controller func, which uses a model func inside it

### as soon as server starts in server.js

--mongoconnect() in mongo.js will run and establish connection with the db
--loadplanets() in planets-model-file will run, takes the data from csv and puts that into the planets-collection inside mongodb DB
--loadlaucnches() in launches-model-file will run, asks spacex for data, then takes that data and stores inside launches-collection in mongodb DB
--so bascially, wheh as soon as server starts, mdb connection is setup and collections are filled with data
