import styles from './PaymentType.module.scss';
import {JSXElement} from "solid-js";
import RadioInput from "./RadioInput";
import {fullAmount, fullAmountPerMo, monthlyAmount} from "../util/prices";
import mobileState from "../state/mobile";

interface PaymentTypeProps {

}

enum PaymentTypeEnum {
  Annually = 'a', Monthly = 'm'
}

const PaymentType = (props: PaymentTypeProps) => {
  const {mobile} = mobileState;

  const getEntry = (value: PaymentTypeEnum, defaultChecked: boolean, label: string, sublabel: JSXElement) =>
    <div classList={{[styles.radioEntry]: true}}>
      <RadioInput name="drone" id={value} value={value} defaultChecked={defaultChecked}/>
      <label for={value}>
        <span><b>{label}</b></span>
        {sublabel}
      </label>
    </div>;


  return <div classList={{[styles.paymentTypeWrapper]: true, [styles.mobile]: mobile()}}>
    {getEntry(PaymentTypeEnum.Annually, true, 'Annually', <span>${fullAmount} <span
      class={styles.pricePerMonth}>(${fullAmountPerMo}/mo)</span></span>)}
    {getEntry(PaymentTypeEnum.Monthly, false, 'Monthly', <span>${monthlyAmount}</span>)}
  </div>
}

export default PaymentType;
