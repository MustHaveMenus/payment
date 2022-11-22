import {formatCreditCardExpireDate} from "../util/util";
import Input from "./Input";

interface CreditCardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CreditCardNumberInput = (props: CreditCardNumberInputProps) => {
  function onInputChange(e: KeyboardEvent) {
    props.onChange(formatCreditCardExpireDate(e));
  }

  return <Input type={'text'} value={props.value} placeholder={'MM / YY'} maxLength={5}
                onKeyUp={e => onInputChange(e)}/>;
}

export default CreditCardNumberInput;
