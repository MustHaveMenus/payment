import {formatCreditCardExpireDate, getMonthYear, isValidCard} from "../util/util";
import Input from "./Input";
import {createSignal} from "solid-js";

interface CreditCardNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CreditCardNumberInput = (props: CreditCardNumberInputProps) => {
  const [errMsg, setErrMsg] = createSignal('');
  function onInputChange(e: KeyboardEvent) {
    const value = formatCreditCardExpireDate(e);
    props.onChange(value);
    const {month, year} = getMonthYear(value);
    setErrMsg(isValidCard(month, year) ? '' : 'Expire date passed');
  }

  return <Input type={'text'} value={props.value} placeholder={'MM / YY'} maxLength={5} errorMsg={errMsg()} skipErrorMessage excludeFS
                onKeyUp={e => onInputChange(e)}/>;
}

export default CreditCardNumberInput;
