import {createRoot, createSignal} from "solid-js";

const locationState = createRoot(() => {
  const [locations, setLocations] = createSignal([] as string[]);
  return {locations, setLocations};
});

export default locationState;
