import {createRoot, createSignal} from "solid-js";
import {PaymentTypeEnum} from "../type/types";

const paymentTypeState = createRoot(() => {
  const [paymentType, setPaymentType] = createSignal(PaymentTypeEnum.None);
  return {paymentType, setPaymentType};
});

export default paymentTypeState;
