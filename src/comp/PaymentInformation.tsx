import styles from './PaymentInformation.module.scss';
import {createSignal} from "solid-js";
import {Countries} from "../util/countries";
import CreditCardNumberInput from "./CreditCardInput";
import CreditCardExpireDateInput from "./CreditCardExpireDateInput";
import Select from "./Select";
import Input from "./Input";

interface PaymentInformationProps {

}

const PaymentInformation = (props: PaymentInformationProps) => {
  const [number, setNumber] = createSignal('');
  const [expireDate, setExpireDate] = createSignal('');

  return <div class={styles.paymentWrapper}>
    <CreditCardNumberInput value={number()} onChange={v => setNumber(v)}/>
    <div class={styles.split}>
      <CreditCardExpireDateInput value={expireDate()} onChange={v => setExpireDate(v)}/>
      <Input type={'text'} placeholder={'CVC'} maxLength={4}/>
    </div>

    <Select values={Countries}/>
    <Input type={'text'} placeholder={'ZIP'}/>
  </div>
}

export default PaymentInformation;
