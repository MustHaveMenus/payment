import {PaymentTypeEnum} from "../type/types";
import {Show} from "solid-js";

interface PriceProps {
  price: number;
  type?: PaymentTypeEnum;
}

const Price = (props: PriceProps) => {
  return <>
    <Show when={props.type} keyed fallback={
      <span>${props.price.toFixed(2)} USD</span>
    }>
      <span>${props.price.toFixed(2)} / {props.type === PaymentTypeEnum.Monthly ? 'month' : 'year'}</span>
    </Show>
  </>
}

export default Price;
