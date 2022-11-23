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
  const [country, setCountry] = createSignal(Countries.at(0));

  function onCountryChange(c: string) {
    setCountry(c);
  }

  return <div class={styles.paymentWrapper}>
    <CreditCardNumberInput value={number()} onChange={v => setNumber(v)}/>
    <div class={styles.split}>
      <CreditCardExpireDateInput value={expireDate()} onChange={v => setExpireDate(v)}/>
      <Input type={'text'} placeholder={'CVC'} maxLength={4}/>
    </div>

    <Select values={Countries} onChange={onCountryChange} value={country()}/>
    <Input type={'text'} placeholder={'ZIP'}/>
  </div>
}

export default PaymentInformation;
