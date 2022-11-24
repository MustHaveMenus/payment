import {batch, createRoot} from "solid-js";
import {LOCATIONS, USERS} from "../util/constants";
import {createStore} from "solid-js/store";
import {LocationDto} from "../generated/client";
import {User} from "../type/types";
import {removeIndex} from "../util/util";

const locationsState = createRoot(() => {
  const [locations, setLocations] = createStore({
    [LOCATIONS]: [] as LocationDto[]
  });
  const addLocations = (newLocs: LocationDto[]) => setLocations(LOCATIONS, locs => [...locs, ...newLocs]);
  const addLocation = (loc: LocationDto) => addLocations([loc]);

  const deleteLocation = (loc: LocationDto) => {
    const idx = locations[LOCATIONS].indexOf(loc);
    setLocations(LOCATIONS, locs => removeIndex(locs, idx));
  };

  const updateProp = (loc: LocationDto, value: string, prop: keyof LocationDto) => {
    const idx = locations[LOCATIONS].indexOf(loc);
    setLocations(LOCATIONS, idx, prop, () => value);
  }

  const updateName = (loc: LocationDto, value: string, newLoc?: boolean) => {
    batch(() => {
      updateProp(loc, value, 'name');
      if (newLoc) {
        updateProp(loc, value, 'id');
      }
    });
  }
  const updateCity = (loc: LocationDto, value: string) => updateProp(loc, value, 'city');
  const updateZip = (loc: LocationDto, value: string) => updateProp(loc, value, 'zip');
  const updateAddress = (loc: LocationDto, value: string) => updateProp(loc, value, 'address');
  const updateAddress2 = (loc: LocationDto, value: string) => updateProp(loc, value, 'address2');
  const cleanInvalidLocations = () => setLocations(LOCATIONS, old => old.filter(it => it.id));

  return {locations, addLocation, addLocations, updateName, updateCity, updateZip, updateAddress, updateAddress2, cleanInvalidLocations, deleteLocation};
});

export default locationsState;
