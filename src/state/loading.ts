import {createRoot, createSignal} from "solid-js";

const loadingState = createRoot(() => {
  const [loading, setLoading] = createSignal(false);
  return {loading, setLoading};
});

export default loadingState;
