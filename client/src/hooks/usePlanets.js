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

// import API function to fetch planets
import { httpGetPlanets } from "../utils/requests";

// custom hook function
function usePlanets() {
  // state to store planets data
  const [planets, setPlanets] = useState([]);

  //! function to get all the planets from the server and to set the state variable with that data which we got back
  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets(); // call API
    setPlanets(fetchedPlanets); // save the planets in state
  }, []);

  // run getPlanets when hook first runs (like "on mount")
  //$ [] → works (runs once), but may trigger ESLint warning.
  //$ [getPlanets] → works the same (because of useCallback([])), but avoids warnings and is the recommended way.
  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  // return planets so component can use them
  return planets;
}

// export hook so other components can use it
export default usePlanets;
