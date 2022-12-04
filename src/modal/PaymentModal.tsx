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
import {isAddonFlow, isValidPaymentInfo} from "../util/util";
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

  createEffect(() => {
    setAddonFlow(isAddonFlow(props.type));
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
    [footerStyles.btnWrapper]: mobile(),
    [footerStyles.secondary]: mobile() && props.type === ViewType.ADD_LOCATION_ADDON
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
        <Show when={!addonFlow()} keyed fallback={
          <span class={styles.topHeader}>Payment Info</span>
        }>
          <span class={styles.topHeader}>Try Pro Plan for free</span>
          <span class={styles.topSubheader}>30-day free trial, cancel at any time</span>
          <span class={styles.topSubheader}>We'll remind you before your trial ends</span>
          <PaymentType/>
        </Show>
        <div class={styles.paymentInformationWrapper}>
          <PaymentInformation onChange={onPaymentInfoChange}/>
        </div>
        {leftSideFooter()}
      </div>

      <div class={styles.right}>
        <SubscriptionDetails users={team[USERS].length} locations={locations[LOCATIONS].filter(it => it.id === it.name).length} status={props.status} loading={props.previewLoading}/>
      </div>

      {rightSideFooter()}
    </div>
  }/>
}
export default PaymentModal;
