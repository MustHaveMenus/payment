import {formatCreditCard} from "../util/util";
import {createEffect, createSignal} from "solid-js";

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

  return <input type={"text"} placeholder={'Card Number'} value={displayedValue()} maxlength={23}
                onKeyUp={e => onInputChange((e.target as HTMLInputElement).value)}/>;
}

export default CreditCardNumberInput;
