import styles from './PaymentType.module.scss';
import {JSXElement} from "solid-js";
import RadioInput from "./RadioInput";

interface PaymentTypeProps {

}

enum PaymentTypeEnum {
  Annually = 'a', Monthly = 'm'
}

const fullAmount = 276;
const fullAmountPerMo = 23;
const monthlyAmount = 30;

const PaymentType = (props: PaymentTypeProps) => {

  const getEntry = (value: PaymentTypeEnum, defaultChecked: boolean, label: string, sublabel: JSXElement) =>
    <div class={styles.radioEntry}>
      <RadioInput name="drone" id={value} value={value} defaultChecked={defaultChecked}/>
      <label for={value}>
        <span><b>{label}</b></span>
        {sublabel}
      </label>
    </div>;


  return <div class={styles.paymentTypeWrapper}>
    {getEntry(PaymentTypeEnum.Annually, true, 'Annually', <span>${fullAmount} <span
      class={styles.pricePerMonth}>(${fullAmountPerMo}/mo)</span></span>)}
    {getEntry(PaymentTypeEnum.Monthly, false, 'Monthly', <span>${monthlyAmount}</span>)}
  </div>
}

export default PaymentType;
