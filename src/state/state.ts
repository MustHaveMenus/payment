import {createRoot, createSignal} from "solid-js";

export const mobileState = createRoot(() => {
  const [mobile, setMobile] = createSignal(false);
  return {mobile, setMobile};
})
