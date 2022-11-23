import {createRoot, createSignal} from "solid-js";
import {createStore} from "solid-js/store";
import {User} from "../type/types";
import {EMAIL, LOCATIONS, USERS} from "../util/constants";
import {removeIndex, replaceAtIndex} from "../util/util";

export const mobileState = createRoot(() => {
  const [mobile, setMobile] = createSignal(false);
  return {mobile, setMobile};
});

export const locationState = createRoot(() => {
  const [locations, setLocations] = createSignal([] as string[]);
  return {locations, setLocations};
})

export const teamState = createRoot(() => {
  const [team, setTeam] = createStore({
    [USERS]: [] as User[]
  });

  const addUser = (user: User) => setTeam(USERS, users => [...users, user]);
  const deleteUser = (user: User) => {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, users => removeIndex(users, idx));
  };
  const addLocation = (user: User, location: string) => {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, idx, LOCATIONS, prev => [...prev, location]);
  }
  const deleteLocation = (user: User, loc: string) => {
    const userIdx = team[USERS].indexOf(user);
    const locationIdx = team[USERS].at(userIdx)?.locations.indexOf(loc) ?? -1;
    setTeam(USERS, userIdx, LOCATIONS, prev => removeIndex(prev, locationIdx));
  }
  const updateLocation = (user: User, oldLoc: string, loc: string) => {
    const userIdx = team[USERS].indexOf(user);
    const locationIdx = team[USERS].at(userIdx)?.locations.indexOf(oldLoc) ?? -1;
    setTeam(USERS, userIdx, LOCATIONS, prev => replaceAtIndex(prev, locationIdx, loc));
  }
  const updateEmail = (user: User, value: string) => {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, idx, EMAIL, () => value);
  }

  return {team, deleteUser, addUser, addLocation, deleteLocation, updateLocation, updateEmail};
});
