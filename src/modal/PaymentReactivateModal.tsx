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
import SubscriptionDetails from "../comp/SubscriptionDetails";
import Agreement from "../comp/Agreement";

interface PaymentModalProps extends GenericModalProps {
}

const PaymentModal = (props: PaymentModalProps) => {
  const {mobile} = mobileState;
  const {team} = teamState;
  const [btnDisabled, setBtnDisabled] = createSignal(false);

  const subscribeBtn = () => <div class={mobile() ? footerStyles.btnWrapper : styles.btnWrapper}>
    <Button label={'Reactivate Now'} secondary disabled={btnDisabled()} onClick={btnDisabled() ? undefined : props.onNext}/>
  </div>;

  const agreementMsg = () => <div class={styles.agreementWrapper}><Agreement/></div>;

  const mobileFooter = () => <div class={footerStyles.borderedFooter}>{subscribeBtn()}</div>;
  const desktopFooter = () => <>{subscribeBtn()}{agreementMsg()}</>;

  const modalFooter = () => mobile() ? mobileFooter() : null;
  const leftSideFooter = () => !mobile() ? desktopFooter : null;
  const rightSideFooter = () => mobile() ? agreementMsg() : null;

  return <Modal onBack={props.onBack} footer={modalFooter()} content={
    <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
      <div class={styles.left}>
        <span class={styles.topHeader}>Reactivate Account</span>
        <span class={styles.topSubheader}>Your designs and shared links are waiting for you!</span>
        <span class={styles.topSubheader}>Confirm your payment to resume account access.</span>
        <PaymentInformation/>
        {leftSideFooter()}
      </div>

      <div class={styles.right}>
        <SubscriptionDetails users={team[USERS].length} locations={1}/>
      </div>

      {rightSideFooter()}
    </div>
  }/>
}
export default PaymentModal;
