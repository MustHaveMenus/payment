import {createRoot} from "solid-js";
import {LOCATIONS} from "../util/constants";
import {createStore} from "solid-js/store";
import {LocationDto} from "../generated/client";

const locationsState = createRoot(() => {
  const [locations, setLocations] = createStore({
    [LOCATIONS]: [] as LocationDto[]
  });
  const addLocations = (newLocs: LocationDto[]) => setLocations(LOCATIONS, locs => [...locs, ...newLocs]);
  const addLocation = (loc: LocationDto) => addLocations([loc]);

  return {locations, addLocation, addLocations};
});

export default locationsState;
