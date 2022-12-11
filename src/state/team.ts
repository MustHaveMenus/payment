import {createRoot} from "solid-js";
import {createStore} from "solid-js/store";
import {EMAIL, LOCATIONS, USERS} from "../util/constants";
import {User} from "../type/types";
import {removeIndex, replaceAtIndex} from "../util/util";
import {LocationDto} from "../generated/client";

const teamState = createRoot(() => {
  const [team, setTeam] = createStore({
    [USERS]: [] as User[]
  });

  const addUser = (user: User) => setTeam(USERS, users => [...users, user]);
  const deleteUser = (user: User) => {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, users => removeIndex(users, idx));
  };
  const addLocation = (user: User, location: LocationDto) => {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, idx, LOCATIONS, prev => [...prev, location]);
  }
  const deleteLocation = (user: User, loc: LocationDto) => {
    const userIdx = team[USERS].indexOf(user);
    const locationIdx = team[USERS].at(userIdx)?.locations.indexOf(loc) ?? -1;
    setTeam(USERS, userIdx, LOCATIONS, prev => removeIndex(prev, locationIdx));
  }

  const updateLocationAtIdx = (user: User, loc: LocationDto, locIdx: number) => {
    const userIdx = team[USERS].indexOf(user);
    setTeam(USERS, userIdx, LOCATIONS, prev => replaceAtIndex(prev, locIdx, loc));
  }

  const updateLocation = (user: User, oldLoc: LocationDto, loc: LocationDto) => {
    const userIdx = team[USERS].indexOf(user);
    const locationIdx = team[USERS].at(userIdx)?.locations.indexOf(oldLoc) ?? -1;
    setTeam(USERS, userIdx, LOCATIONS, prev => replaceAtIndex(prev, locationIdx, loc));
  }
  const updateEmail = (user: User, value: string) => {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, idx, EMAIL, () => value);
  }
  const cleanUsers = () => {
    setTeam(USERS, _ => []);
  }

  return {team, deleteUser, addUser, addLocation, deleteLocation, updateLocation, updateEmail, cleanUsers, updateLocationAtIdx};
});

export default teamState;
