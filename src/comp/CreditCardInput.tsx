import {formatCreditCard} from "../util/util";
import {createEffect, createSignal} from "solid-js";
import Input from "./Input";

interface CreditCardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CreditCardNumberInput = (props: CreditCardNumberInputProps) => {
  const [displayedValue, setDisplayedValue] = createSignal("");

  function onInputChange(value: string) {
    props.onChange(value?.replace(/s/g, ""));
  }

  createEffect(() => {
    setDisplayedValue(formatCreditCard(props.value));
  });

  return <Input type={"text"} placeholder={'Card Number'} value={displayedValue()} maxLength={23} excludeFS
                onKeyUp={e => onInputChange((e.target as HTMLInputElement).value)}/>;
}

export default CreditCardNumberInput;
