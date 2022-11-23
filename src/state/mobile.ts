import {createRoot, createSignal} from "solid-js";

const mobileState = createRoot(() => {
  const [mobile, setMobile] = createSignal(false);
  return {mobile, setMobile};
});

export default mobileState;
