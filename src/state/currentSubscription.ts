import {createRoot, createSignal} from "solid-js";
import {PaymentTypeEnum} from "../type/types";
import {SubStatusDto} from "../generated/client";

const currentSubscriptionState = createRoot(() => {
  const [currentSubscription, setCurrentSubscription] = createSignal({} as SubStatusDto);
  return {currentSubscription, setCurrentSubscription};
});

export default currentSubscriptionState;
