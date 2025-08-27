//$ the below code is a custom hook
//$ the below code is a custom hook
//$ the below code is a custom hook
//$ the below code is a custom hook
//$ The below code is a custom hook

//$ A custom hook is just a normal function that uses React hooks inside it
//$ It lets us reuse logic (like fetching, saving, updating data) in different components

// useCallback is to pass a function to it, so it doesnt keep re-rendering when the component re-renders
// we need to pass those external things that are being used in the useCallback() fucntion, into the dependency array of useCallback()
// useEffect is for side things
// useState is to store local state data
import { useCallback, useEffect, useState } from "react";

// import our server request functions
import {
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
} from "../utils/requests";

// custom hook function
function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
  // state to hold all launches data
  const [launches, setLaunches] = useState([]);
  // state to know if we are currently submitting a launch
  const [isPendingLaunch, setPendingLaunch] = useState(false);

  //! function to get all the launches from server and to set the state variable with that data which we got back
  const getLaunches = useCallback(async () => {
    const fetchedLaunches = await httpGetLaunches(); // call API
    setLaunches(fetchedLaunches); // save result in state
  }, []);

  // run getLaunches when this hook first runs (like "on mount")
  //$ [] → works (runs once), but may trigger ESLint warning.
  //$ [getLaunches] → works the same (because of useCallback([])), but avoids warnings and is the recommended way.
  useEffect(() => {
    getLaunches();
  }, [getLaunches]);

  // function to submit a new launch
  const submitLaunch = useCallback(
    async (e) => {
      e.preventDefault(); // stop page reload
      setPendingLaunch(true); // show "loading" state

      //! first we are getting the data from the form
      const data = new FormData(e.target);
      const launchDate = new Date(data.get("launch-day")); // convert string to Date
      const mission = data.get("mission-name");
      const rocket = data.get("rocket-name");
      const target = data.get("planets-selector");

      //! then we are using the function that we coded in requests.js, to add new launch to already existing launches
      const response = await httpSubmitLaunch({
        launchDate,
        mission,
        rocket,
        target,
      });

      //! if success, we are running the getLaunches() again, so we have updated data in out state variables
      const success = response.ok; // check if server accepted it
      if (success) {
        getLaunches(); // reload launches
        setTimeout(() => {
          setPendingLaunch(false); // turn off loading state
          onSuccessSound(); // play success sound
        }, 800); // small delay for smooth animation
      } else {
        onFailureSound(); // play failure sound if something went wrong
      }
    },

    //! this is the dependency array of useCallback.
    //! whatever external things we have used in the above function, we need to pass those external things into this dependency array
    [getLaunches, onSuccessSound, onFailureSound]
  );

  // function to abort (delete) a launch
  const abortLaunch = useCallback(
    async (id) => {
      const response = await httpAbortLaunch(id); //! we need to pass the id and then call httpAbortLaunch on that id

      //! if success, we are running the getLaunches() again, so we have updated data in out state variables
      const success = response.ok;
      if (success) {
        getLaunches(); // reload launches
        onAbortSound(); // play abort sound
      } else {
        onFailureSound(); // play failure sound
      }
    },

    //! this is the dependency array of useCallback.
    //! whatever external things we have used in the above function, we need to pass those external things into this dependency array
    [getLaunches, onAbortSound, onFailureSound]
  );

  // return things so components can use them
  //! returning those two state vars and two functions, so other components can use them
  return {
    launches, // the launches data
    isPendingLaunch, // true/false if launch is being submitted
    submitLaunch, // function to submit new launch
    abortLaunch, // function to abort launch
  };
}

// export so other components can use it
export default useLaunches;
