import {createRoot, createSignal} from "solid-js";

const memberState = createRoot(() => {
  const [memberId, setMemberId] = createSignal('');

  return {memberId, setMemberId};
});

export default memberState;
