import styles from './PaymentReactivateModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {createSignal, Show} from "solid-js";
import {USERS} from "../util/constants";
import teamState from "../state/team";
import mobileState from "../state/mobile";
import footerStyles from "../comp/ModalFooter.module.scss";
import SubscriptionDetails from "../comp/SubscriptionDetails";
import Agreement from "../comp/Agreement";
import CardOnFile from "../comp/CardOnFile";
import PaymentInformation from "../comp/PaymentInformation";
import {PaymentInfo, ViewType} from "../type/types";

interface PaymentModalProps extends GenericModalProps {
  type: ViewType;
}

const PaymentModal = (props: PaymentModalProps) => {
  const {mobile} = mobileState;
  const {team} = teamState;
  const [btnDisabled, setBtnDisabled] = createSignal(false);
  const [showPaymentForm, setShowPaymentForm] = createSignal(false);

  const subscribeBtn = () => <div class={mobile() ? footerStyles.btnWrapper : styles.btnWrapper}>
    <Button label={'Reactivate Now'} secondary disabled={btnDisabled()} onClick={btnDisabled() ? undefined : props.onNext}/>
  </div>;

  const agreementMsg = () => <div class={styles.agreementWrapper}><Agreement/></div>;

  const mobileFooter = () => <div class={footerStyles.borderedFooter}>{subscribeBtn()}</div>;
  const desktopFooter = () => <>{subscribeBtn()}{agreementMsg()}</>;

  const modalFooter = () => mobile() ? mobileFooter() : null;
  const leftSideFooter = () => !mobile() ? desktopFooter : null;
  const rightSideFooter = () => mobile() ? agreementMsg() : null;

  function onUpdatePayment() {
    setShowPaymentForm(true);
    setBtnDisabled(true);
  }

  function onPaymentInfoChange(info: PaymentInfo) {
    console.log(info);
  }

  return <Modal onBack={props.onBack} footer={modalFooter()} content={
    <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
      <div class={styles.left}>
        <span class={styles.topHeader}>Reactivate Account</span>
        <span class={styles.topSubheader}>Your designs and shared links are waiting for you!</span>
        <span class={styles.topSubheader}>Confirm your payment to resume account access.</span>

        <Show when={showPaymentForm()} keyed
              fallback={
                <>
                  <div class={styles.cardOnFileWrapper}>
                    <CardOnFile card={{exprMonth: 10, exprYear: 26, ending: '1234'}}/>
                  </div>
                  <span class={styles.updatePaymentBtn} onClick={onUpdatePayment}>Update payment method</span>
                </>
              }>
          <span class={styles.paymentInformationHeader}>Payment Information</span>
          <PaymentInformation onChange={onPaymentInfoChange}/>
        </Show>

        {leftSideFooter()}
      </div>

      <div class={styles.right}>
        TODO
        <SubscriptionDetails users={team[USERS].length} locations={1} loading={false} status={{}} type={props.type}/>
      </div>

      {rightSideFooter()}
    </div>
  }/>
}
export default PaymentModal;
