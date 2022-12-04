import {createRoot, createSignal} from "solid-js";
import {PaymentInfo} from "../type/types";

const paymentInfoState = createRoot(() => {
  const [paymentInfo, setPaymentInfo] = createSignal({} as PaymentInfo);
  return {paymentInfo, setPaymentInfo};
});

export default paymentInfoState;
