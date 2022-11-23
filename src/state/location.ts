import {createRoot} from "solid-js";
import {LOCATIONS} from "../util/constants";
import {Location} from "../type/types";
import {createStore} from "solid-js/store";

const locationsState = createRoot(() => {
  const [locations, setLocations] = createStore({
    [LOCATIONS]: [] as Location[]
  });
  const addLocations = (newLocs: Location[]) => setLocations(LOCATIONS, locs => [...locs, ...newLocs]);
  const addLocation = (loc: Location) => addLocations([loc]);

  return {locations, addLocation, addLocations};
});

export default locationsState;
