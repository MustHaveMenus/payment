import {formatCreditCard, formatCreditCardExpireDate} from "../util/util";
import {createEffect, createSignal} from "solid-js";

interface CreditCardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CreditCardNumberInput = (props: CreditCardNumberInputProps) => {
  function onInputChange(e: KeyboardEvent) {
    props.onChange(formatCreditCardExpireDate(e));
  }

  createEffect(() => {
    // setDisplayedValue(formatCreditCard(props.value));
  });

  return <input type={'text'} value={props.value} placeholder={'MM / YY'} maxLength={5}
                onKeyUp={e => onInputChange(e)}/>;
}

export default CreditCardNumberInput;
