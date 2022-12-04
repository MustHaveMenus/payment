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
import {getCycle, isAddonFlow, isValidPaymentInfo} from "../util/util";
import AccountsApi from "../api/AccountsApi";
import memberState from "../state/member";
import paymentTypeState from "../state/paymentType";
import {handleServerError} from "../util/ErrorHandler";
import {UpgradeSubscriptionDto} from "../generated/client";
import loadingState from "../state/loading";

interface PaymentModalProps extends StepModalProps {
}

const PaymentModal = (props: PaymentModalProps) => {
  const {mobile} = mobileState;
  const {team} = teamState;
  const {locations} = locationsState;
  const {memberId} = memberState;
  const {paymentType} = paymentTypeState;
  const {setLoading} = loadingState;
  const [btnDisabled, setBtnDisabled] = createSignal(true);
  const [paymentInfo, setPaymentInfo] = createSignal({} as PaymentInfo);

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

  async function onSubscribe() {
    try {
      setLoading(true);
      const dto = {
        zip: paymentInfo().zip,
        cycle: getCycle(paymentType()),
        card: {
          number: paymentInfo().number,
          month: `${paymentInfo().month}`,
          year: `${paymentInfo().year}`,
          cvv: paymentInfo().cvc
        }
      } as UpgradeSubscriptionDto;
      const resp = await AccountsApi.upgradeSubscriptionPlan(memberId(), dto);
      setLoading(false);
      props.onNext?.();
    } catch (e: any) {
      setLoading(false);
      await handleServerError(e);
    }
  }

  const subscribeBtn = () => <div class={mobile() ? footerStyles.btnWrapper : styles.btnWrapper}>
    <Button label={'Subscribe'} disabled={btnDisabled()} onClick={onSubscribe}/>
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
        <SubscriptionDetails users={team[USERS].length} locations={locations[LOCATIONS].filter(it => it.id === it.name).length}/>
      </div>

      {rightSideFooter()}
    </div>
  }/>
}
export default PaymentModal;
