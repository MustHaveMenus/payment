import {createRoot, createSignal} from "solid-js";
import {MemberDto} from "../generated/client";

const memberState = createRoot(() => {
  const [member, setMember] = createSignal({} as MemberDto);
  return {member, setMember};
});

export default memberState;
