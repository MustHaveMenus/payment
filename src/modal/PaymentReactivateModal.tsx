import styles from './PaymentReactivateModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {createEffect, createSignal, onMount, Show} from "solid-js";
import mobileState from "../state/mobile";
import footerStyles from "../comp/ModalFooter.module.scss";
import SubscriptionDetails from "../comp/SubscriptionDetails";
import Agreement from "../comp/Agreement";
import CardOnFile from "../comp/CardOnFile";
import PaymentInformation from "../comp/PaymentInformation";
import {PaymentInfo, PaymentTypeEnum, ViewType} from "../type/types";
import AccountsApi from "../api/AccountsApi";
import memberState from "../state/member";
import loadingState from "../state/loading";
import {handleServerError} from "../util/ErrorHandler";
import paymentInfoState from "../state/paymentInfo";
import {isValidPaymentInfo} from "../util/util";
import {SubStatusDto, SubStatusDtoPlanCycleEnum} from "../generated/client";
import paymentTypeState from "../state/paymentType";

interface PaymentModalProps extends GenericModalProps {
  type: ViewType;
  onPay: () => void;
  status: SubStatusDto;
  previewLoading: boolean;
}

const PaymentModal = (props: PaymentModalProps) => {
  const {mobile} = mobileState;
  const {member} = memberState;
  const {setLoading} = loadingState;
  const {paymentInfo, setPaymentInfo} = paymentInfoState;
  const {setPaymentType} = paymentTypeState;
  const [btnDisabled, setBtnDisabled] = createSignal(false);
  const [showPaymentForm, setShowPaymentForm] = createSignal(false);
  const [cardLast4, setCardLast4] = createSignal('');
  const [cardExprMonth, setCardExprMonth] = createSignal(0);
  const [cardExprYear, setCardExprYear] = createSignal(0);
  const [userNr, setUserNr] = createSignal(0);
  const [locNr, setLocNr] = createSignal(0);

  onMount(async () => {
    if (!member() || !member().id) return;
    setLoading(true);
    try {
      const paymentDetails = await AccountsApi.getPaymentDetails(member().id!);
      setCardLast4(paymentDetails.card?.ending || '');
      setCardExprMonth(paymentDetails.card?.exprMonth || 0);
      setCardExprYear(paymentDetails.card?.exprYear || 0);
      setLoading(false);
    } catch (e) {
      await handleServerError(e);
      setLoading(false);
    }
  });

  createEffect(() => {
    if (!props.status || !props.status.addons) return;
    setUserNr(props.status.addons.find(it => it.type === 'USER')?.quantity || 0);
    setLocNr(props.status.addons.find(it => it.type === 'LOCATION')?.quantity || 0);
    setPaymentType(props.status.planCycle === SubStatusDtoPlanCycleEnum.Monthly ? PaymentTypeEnum.Monthly : PaymentTypeEnum.Annually);
  });

  createEffect(() => {
    setBtnDisabled(showPaymentForm() && !isValidPaymentInfo(paymentInfo()));
  });

  const subscribeBtn = () => <div class={mobile() ? footerStyles.btnWrapper : styles.btnWrapper}>
    <Button label={'Reactivate Now'} secondary disabled={btnDisabled()} onClick={props.onPay}/>
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
    setPaymentInfo(info);
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
                    <CardOnFile card={{exprMonth: cardExprMonth(), exprYear: cardExprYear(), ending: cardLast4()}}/>
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
        <SubscriptionDetails users={userNr()} locations={locNr()} loading={props.previewLoading} status={props.status} type={props.type}/>
      </div>

      {rightSideFooter()}
    </div>
  }/>
}
export default PaymentModal;
