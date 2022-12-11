import {createRoot, createSignal} from "solid-js";

const flowState = createRoot(() => {
  const [flow, setFlow] = createSignal('');
  const isAvailableSeatFlow = () => flow() === 'available-seat';
  return {flow, setFlow, isAvailableSeatFlow};
});

export default flowState;
