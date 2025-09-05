//$ the below code is in the hooks folder, but is not a custom hook
//$ the below code is in the hooks folder, but is not a custom hook
//$ the below code is in the hooks folder, but is not a custom hook
//$ the below code is in the hooks folder, but is not a custom hook

// base URL for our API
//! how did we get this url
//! coz, backend is running on port 8000
//! also, in backend's app.js, all api urls are mounted on /v1
//! so we need use that "specifc-port" as well as the "mount-v1"
//@ we use one url if we are running the application locally and the other url when we are running the application from cloud
// const API_URL = "http://localhost:8000/v1";
const API_URL = "v1";

//! so basically we dont have the whole planets data, backend API has it, which we will be coding soon
//! so for now, we are just hitting that api and getting all that data
//! since the data returned by API is stringified, we need to first parse it, and then use it
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`); // ask server for planets
  return await response.json(); // convert response to JavaScript object
}

//! so basically we dont have the whole launches data, backend API has it, which we will be coding soon
//! so for now, we are just hitting that api and getting all that data
//! since the data returned by API is stringified, we need to first parse it, and then use it
//! addditionally, we are also sorting the launches data by the flight number
// to get all launches from the server, sort them by flight number, and return
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`); // ask server for launches
  const fetchedLaunches = await response.json(); // convert to JS object
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber; // sort from smallest flight number to biggest
  });
}

//! this one sends new launch data via post request, which is to be added to launches
//! so here we are hitting the api with post method and some data
//! since we are sending the data, we need to stringify it and send
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post", // we are sending data
      headers: {
        "Content-Type": "application/json", // we are sending JSON
      },
      body: JSON.stringify(launch), // turn JS object into JSON string
    });
  } catch (err) {
    // if something goes wrong, just return ok: false
    return {
      ok: false,
    };
  }
}

//! this code for deleting a specific launch from the launches data
//! we do this by hitting the api with delete-http-method
//! we are deleting it by the launch id
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete", // tell server to delete //! delete is one of the http methods
    });
  } catch (err) {
    console.log(err); // show error in console
    return {
      ok: false, // if error, return ok: false
    };
  }
}

// export all functions so other files can use them
export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
