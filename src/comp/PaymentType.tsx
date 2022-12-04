import styles from './PaymentType.module.scss';
import {JSXElement, onMount} from "solid-js";
import RadioInput from "./RadioInput";
import {fullAmount, fullAmountPerMo, monthlyAmount} from "../util/prices";
import mobileState from "../state/mobile";
import {PaymentTypeEnum} from "../type/types";
import paymentTypeState from "../state/paymentType";

interface PaymentTypeProps {

}

const PaymentType = (props: PaymentTypeProps) => {
  const {mobile} = mobileState;
  const {paymentType, setPaymentType} = paymentTypeState;

  onMount(() => {
    if (paymentType() === PaymentTypeEnum.None) {
      setPaymentType(PaymentTypeEnum.Annually);
    }
  });

  function onPaymentTypeChange(val: string) {
    setPaymentType(val as PaymentTypeEnum);
  }

  const getEntry = (value: PaymentTypeEnum, defaultChecked: boolean, label: string, sublabel: JSXElement) =>
    <div classList={{[styles.radioEntry]: true}}>
      <RadioInput name="paymentType" id={value} value={value} defaultChecked={defaultChecked} onChange={onPaymentTypeChange}/>
      <label for={value}>
        <span><b>{label}</b></span>
        {sublabel}
      </label>
    </div>;


  return <div classList={{[styles.paymentTypeWrapper]: true, [styles.mobile]: mobile()}}>
    {getEntry(PaymentTypeEnum.Annually, paymentType() === PaymentTypeEnum.Annually, 'Annually', <span>${fullAmount} <span
      class={styles.pricePerMonth}>(${fullAmountPerMo}/mo)</span></span>)}
    {getEntry(PaymentTypeEnum.Monthly, paymentType() === PaymentTypeEnum.Monthly, 'Monthly', <span>${monthlyAmount}/mo</span>)}
  </div>
}

export default PaymentType;
