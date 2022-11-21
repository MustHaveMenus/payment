import styles from './PaymentModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import PaymentInformation from "../comp/PaymentInformation";
import PaymentType from "../comp/PaymentType";
import Button from "../comp/Button";
import {createSignal} from "solid-js";

interface PaymentModalProps extends GenericModalProps {
}

const PaymentModal = (props: PaymentModalProps) => {
  const [btnDisabled, setBtnDisabled] = createSignal(true);

  return <Modal onClose={props.onClose} onBack={props.onBack} content={
    <div class={styles.wrapper}>
      <div class={styles.left}>
        <span class={styles.topHeader}>Try Pro Plan for free</span>
        <span class={styles.topSubheader}>30-day free trial, cancel at any time</span>
        <span class={styles.topSubheader}>We'll remind you before your trial ends</span>

        <PaymentType/>
        <PaymentInformation/>
        <div class={styles.btnWrapper}>
          <Button label={'Subscribe'} disabled={btnDisabled()}/>
        </div>
        <div class={styles.agreement}>
          <span>By continuing, you agree to our <a href={'https://www.musthavemenus.com'}>Terms of Use</a>, confirm you have read our <a
            href={'https://www.musthavemenus.com'}>Privacy Policy</a>, and agree to the recurring charges for your subscription plan until you cancel.</span>
        </div>
      </div>
      <div class={styles.right}>
        right
      </div>
    </div>
  }/>
}
export default PaymentModal;
