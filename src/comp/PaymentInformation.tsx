import styles from './PaymentInformation.module.scss';
import {createSignal, For} from "solid-js";
import {Countries} from "../util/countries";
import CreditCardNumberInput from "./CreditCardInput";
import CreditCardExpireDateInput from "./CreditCardExpireDateInput";

interface PaymentInformationProps {

}

const PaymentInformation = (props: PaymentInformationProps) => {
  const [number, setNumber] = createSignal('');
  const [expireDate, setExpireDate] = createSignal('');

  return <div class={styles.paymentWrapper}>
    <CreditCardNumberInput value={number()} onChange={v => setNumber(v)}/>
    <div class={styles.split}>
      <CreditCardExpireDateInput value={expireDate()} onChange={v => setExpireDate(v)} />
      <input type={'text'} placeholder={'CVC'} maxlength={4}/>
    </div>

    <select>
      <For each={Countries} fallback={<div>Loading...</div>}>
        {(item) => <option>{item}</option>}
      </For>
    </select>
    <input type={'text'} placeholder={'ZIP'}/>
  </div>
}

export default PaymentInformation;
