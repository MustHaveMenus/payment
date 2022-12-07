import styles from './PaymentModal.module.scss';
import Modal, {StepModalProps} from "../comp/Modal";
import PaymentInformation from "../comp/PaymentInformation";
import PaymentType from "../comp/PaymentType";
import Button from "../comp/Button";
import {createEffect, createSignal, Show} from "solid-js";
import {LOCATIONS, USERS} from "../util/constants";
import teamState from "../state/team";
import mobileState from "../state/mobile";
import footerStyles from "../comp/ModalFooter.module.scss";
import SubscriptionDetails from "../comp/SubscriptionDetails";
import Agreement from "../comp/Agreement";
import locationsState from "../state/location";
import {PaymentInfo, ViewType} from "../type/types";
import {isAddonFlow, isReactivateFlow, isValidPaymentInfo} from "../util/util";
import paymentInfoState from "../state/paymentInfo";
import {SubStatusDto} from "../generated/client";

interface PaymentModalProps extends StepModalProps {
  onPay: () => void;
  status: SubStatusDto;
  previewLoading: boolean;
}

const PaymentModal = (props: PaymentModalProps) => {
  const {mobile} = mobileState;
  const {team} = teamState;
  const {locations} = locationsState;
  const [btnDisabled, setBtnDisabled] = createSignal(true);
  const {paymentInfo, setPaymentInfo} = paymentInfoState;

  const [addonFlow, setAddonFlow] = createSignal(true);
  const [reactivateFlow, setReactivateFlow] = createSignal(false);
  const [friendlyStatus, setFriendlyStatus] = createSignal('');

  createEffect(() => {
    setAddonFlow(isAddonFlow(props.type));
  });

  createEffect(() => {
    setReactivateFlow(isReactivateFlow(props.type));
  });

  createEffect(() => {
    if (props.type === ViewType.REACTIVATE_FROM_DECLINED) {
      setFriendlyStatus('declined');
    }
    if (props.type === ViewType.REACTIVATE_FROM_CANCELLED) {
      setFriendlyStatus('cancelled');
    }
    if (props.type === ViewType.REACTIVATE_FROM_PAUSED) {
      setFriendlyStatus('paused');
    }
  });

  function onPaymentInfoChange(info: PaymentInfo) {
    setPaymentInfo(info);
  }

  createEffect(() => {
    setBtnDisabled(!isValidPaymentInfo(paymentInfo()));
  });

  const subscribeBtn = () => <div classList={{
    [styles.btnWrapper]: !mobile(),
    [styles.secondary]: !mobile() && props.type === ViewType.ADD_LOCATION_ADDON,
    [styles.tertiary]: !mobile() && reactivateFlow(),
    [footerStyles.btnWrapper]: mobile(),
    [footerStyles.secondary]: mobile() && props.type === ViewType.ADD_LOCATION_ADDON,
    [footerStyles.tertiary]: mobile() && reactivateFlow()
  }}>
    <Button label={'Subscribe'} disabled={btnDisabled()} onClick={props.onPay}/>
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
        <Show when={reactivateFlow()} keyed fallback={
          <Show when={!addonFlow()} keyed fallback={
            <span class={styles.topHeader}>Payment Info</span>
          }>
            <span class={styles.topHeader}>Try Pro Plan for free</span>
            <span class={styles.topSubheader}>30-day free trial, cancel at any time</span>
            <span class={styles.topSubheader}>We'll remind you before your trial ends</span>
            <PaymentType/>
          </Show>
        }>
          <span class={styles.topHeader}>Welcome Back!</span>
          <span class={styles.topSubheader}>Your account is in <b>{friendlyStatus()} status</b>. Enter your card information below to restart your account.</span>
          <PaymentType/>
        </Show>
        <div class={styles.paymentInformationWrapper}>
          <PaymentInformation onChange={onPaymentInfoChange}/>
        </div>
        {leftSideFooter()}
      </div>

      <div class={styles.right}>
        <SubscriptionDetails users={team[USERS].length} locations={locations[LOCATIONS].filter(it => it.id === it.name).length} status={props.status} loading={props.previewLoading} type={props.type}/>
      </div>

      {rightSideFooter()}
    </div>
  }/>
}
export default PaymentModal;
