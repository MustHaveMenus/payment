import styles from './PaymentModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import PaymentInformation from "../comp/PaymentInformation";
import PaymentType from "../comp/PaymentType";
import Button from "../comp/Button";
import {createSignal} from "solid-js";
import {productType, subscriptionTotal} from "../util/prices";
import {USERS} from "../util/constants";
import teamState from "../state/team";
import mobileState from "../state/mobile";
import footerStyles from "../comp/ModalFooter.module.scss";

interface PaymentModalProps extends GenericModalProps {
}

const PaymentModal = (props: PaymentModalProps) => {
  const {mobile} = mobileState;
  const {team} = teamState;
  const [btnDisabled, setBtnDisabled] = createSignal(false);

  const subscribeBtn = () => <div class={mobile() ? footerStyles.btnWrapper : styles.btnWrapper}>
    <Button label={'Subscribe'} disabled={btnDisabled()} onClick={btnDisabled() ? undefined : props.onNext}/>
  </div>;

  const agreementMsg = () => <div class={styles.agreement}>
          <span>By continuing, you agree to our <a href={'https://www.musthavemenus.com'} target={'_blank'}>Terms of Use</a>, confirm you have read our <a
            href={'https://www.musthavemenus.com'} target={'_blank'}>Privacy Policy</a>, and agree to the recurring charges for your subscription plan until you cancel.</span>
  </div>;

  const mobileFooter = () => <div class={footerStyles.borderedFooter}>{subscribeBtn()}</div>;
  const desktopFooter = () => <>{subscribeBtn()}{agreementMsg()}</>;

  const modalFooter = () => mobile() ? mobileFooter() : null;
  const leftSideFooter = () => !mobile() ? desktopFooter : null;
  const rightSideFooter = () => mobile() ? agreementMsg() : null;

  return <Modal onBack={props.onBack} footer={modalFooter()} content={
    <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
      <div class={styles.left}>
        <span class={styles.topHeader}>Try Pro Plan for free</span>
        <span class={styles.topSubheader}>30-day free trial, cancel at any time</span>
        <span class={styles.topSubheader}>We'll remind you before your trial ends</span>
        <PaymentType/>
        <PaymentInformation/>
        {leftSideFooter()}
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
            <div>{team[USERS].length}</div>
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

      {rightSideFooter()}
    </div>
  }/>
}
export default PaymentModal;
