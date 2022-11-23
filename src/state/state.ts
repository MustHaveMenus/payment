import {createRoot, createSignal} from "solid-js";
import {createStore} from "solid-js/store";
import {User} from "../type/types";
import {USERS} from "../util/constants";

export const mobileState = createRoot(() => {
  const [mobile, setMobile] = createSignal(false);
  return {mobile, setMobile};
});

export const locationState = createRoot(() => {
  const [locations, setLocations] = createSignal([] as string[]);
  return {locations, setLocations};
})

export const teamState = createRoot(() => {
  return createStore({
    [USERS]: [] as User[]
  });
});
