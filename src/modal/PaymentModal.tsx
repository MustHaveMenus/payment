import styles from './PaymentModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import PaymentInformation from "../comp/PaymentInformation";
import PaymentType from "../comp/PaymentType";
import Button from "../comp/Button";
import {createSignal} from "solid-js";

interface PaymentModalProps extends GenericModalProps {
}

const productType = 'Pro Annual';
const subscriptionTotal = '$276.00 / year';

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
          <Button label={'Subscribe'} disabled={btnDisabled()} onClick={btnDisabled() ? undefined : props.onNext}/>
        </div>
        <div class={styles.agreement}>
          <span>By continuing, you agree to our <a href={'https://www.musthavemenus.com'} target={'_blank'}>Terms of Use</a>, confirm you have read our <a
            href={'https://www.musthavemenus.com'} target={'_blank'}>Privacy Policy</a>, and agree to the recurring charges for your subscription plan until you cancel.</span>
        </div>
      </div>

      <div class={styles.right}>
        <span class={styles.topHeader}>Subscription Details</span>

        <div class={styles.paymentDetails}>
          <div class={styles.paymentDetailsHeader}>
            <span>Subscription</span>
          </div>
          <div class={styles.paymentDetailsEntry}>
            <div>{productType}</div>
            <div>{subscriptionTotal}</div>
          </div>
        </div>

        <div class={`${styles.paymentDetails} ${styles.topBorder}`}>
          <div class={styles.paymentDetailsHeader}>
            <span>Add-on</span>
            <span>Qty</span>
            <span>&nbsp;</span>
          </div>
          <div class={styles.paymentDetailsEntry}>
            <div>Users</div>
            <div>2</div>
            <div>$240.00 / year</div>
          </div>
          <div class={styles.paymentDetailsEntry}>
            <div>Locations</div>
            <div>1</div>
            <div>$120.00 / year</div>
          </div>
        </div>

        <div class={`${styles.paymentDetails} ${styles.topBorder}`}>
          <div class={styles.paymentDetailsEntry}>
            <div>Subtotal</div>
            <div>$636.00 USD</div>
          </div>
          <div class={styles.paymentDetailsEntry}>
            <div>Tax</div>
            <div>$0.00 USD</div>
          </div>
        </div>
      </div>
    </div>
  }/>
}
export default PaymentModal;
