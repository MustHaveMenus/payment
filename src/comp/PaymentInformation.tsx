import styles from './PaymentInformation.module.scss';
import {createEffect, createSignal} from "solid-js";
import {Countries} from "../util/countries";
import CreditCardNumberInput from "./CreditCardInput";
import CreditCardExpireDateInput from "./CreditCardExpireDateInput";
import Select from "./Select";
import Input from "./Input";
import {countryValues, getMonthYear} from "../util/util";
import {Option, PaymentInfo} from "../type/types";

interface PaymentInformationProps {
  onChange: (info: PaymentInfo) => void;
  zip?: string;
}

const PaymentInformation = (props: PaymentInformationProps) => {
  const [number, setNumber] = createSignal('');
  const [cvc, setCVC] = createSignal('');
  const [zip, setZIP] = createSignal(props.zip || '');
  const [expireDate, setExpireDate] = createSignal('');
  const [country, setCountry] = createSignal(Countries.at(0));



  createEffect(() => {
    const {month, year} = getMonthYear(expireDate());

    props.onChange({
      number: number(),
      cvc: cvc(),
      zip: zip(),
      country: (country() || Countries.at(0)!),
      month,
      year
    });
  });

  function onCountryChange(c: Option) {
    setCountry(c.id);
  }

  return <div class={styles.paymentWrapper}>
    <CreditCardNumberInput value={number()} onChange={v => setNumber(v)}/>
    <div class={styles.split}>
      <CreditCardExpireDateInput value={expireDate()} onChange={v => setExpireDate(v)}/>
      <Input type={'text'} placeholder={'CVC'} value={cvc()} maxLength={4} onChange={v => setCVC(v)} excludeFS/>
    </div>

    <Select values={countryValues} onChange={onCountryChange} value={{id: (country() ?? ''), name: (country() ?? '')}}/>
    <Input type={'text'} placeholder={'ZIP'} value={zip()} onChange={v => setZIP(v)}/>
  </div>
}

export default PaymentInformation;
