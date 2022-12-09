import styles from './ConfirmationModal.module.scss';
import party from '../assets/party.webp';
import Modal, {StepModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import openState from "../state/open";
import footerStyles from "../comp/ModalFooter.module.scss";
import mobileState from "../state/mobile";
import {SubStatusDto} from "../generated/client";
import {createEffect, createSignal, Show} from "solid-js";
import {PaymentTypeEnum, ViewType} from "../type/types";
import Price from "../comp/Price";
import {SUBSCRIPTION_NAME_ANNUALY, SUBSCRIPTION_NAME_MONTHLY} from "../util/constants";
import FormattedDate from "../comp/FormattedDate";
import {getPaymentTypeCycle} from "../util/util";
import currentSubscriptionState from "../state/currentSubscription";

interface ConfirmationModalProps extends StepModalProps {
  onSuccess?: () => void;
  status: SubStatusDto;
  users: number;
  locations: number;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {closeModal} = openState;
  const {mobile} = mobileState;
  const [addonUpgrade, setAddonUpgrade] = createSignal(false);
  const [reactivateFlow, setReactivateFlow] = createSignal(false);
  const [addonsLabel, setAddonsLabel] = createSignal('');
  const [userSubtotal, setUserSubtotal] = createSignal(0.0);
  const [locationSubtotal, setLocationSubtotal] = createSignal(0.0);
  const [grandTotal, setGrandTotal] = createSignal(0.0);
  const [subtotal, setSubtotal] = createSignal(0.0);
  const [cycle, setCycle] = createSignal(PaymentTypeEnum.None);
  const [dueDate, setDueDate] = createSignal(new Date());
  const {currentSubscription} = currentSubscriptionState;
  const [hadTrial, setHadTrial] = createSignal(false);
  const [trialEnded, setTrialEnded] = createSignal(true);
  const [trialStarted, setTrialStarted] = createSignal(false);
  const [inTrial, setInTrial] = createSignal(false);

  createEffect(() => {
    setAddonUpgrade(props.type === ViewType.ADD_LOCATION_ADDON || props.type === ViewType.ADD_USER_ADDON);
  });

  createEffect(() => {
    setReactivateFlow(props.type === ViewType.REACTIVATE_FROM_CANCELLED || props.type === ViewType.REACTIVATE_FROM_DECLINED || props.type === ViewType.REACTIVATE_FROM_PAUSED);
  });

  createEffect(() => {
    const locations = !props.locations ? '' : `${props.locations} Location${props.locations > 1 ? 's' : ''}`;
    const users = !props.users ? '' : `${props.users} User${props.users > 1 ? 's' : ''}`;

    setAddonsLabel([locations, users].filter(it => it).join(', '));
  });

  createEffect(() => {
    if (!props.status.addons || !props.users) return;
    setUserSubtotal((props.status.addons.find(it => it.type === 'USER')?.total || 0) * props.users);
  });

  createEffect(() => {
    if (!props.status.addons || !props.locations) return;
    setLocationSubtotal((props.status.addons.find(it => it.type === 'LOCATION')?.total || 0) * props.locations);
  });

  createEffect(() => {
    if (!props.status) return;
    setGrandTotal(subtotal() + (props.status.totalTax || 0));
  });

  createEffect(() => {
    if (!props.status || !props.status.grandTotal) return;

    if (addonUpgrade()) {
      setSubtotal(props.status.grandTotal || 0);
    } else {
      setSubtotal(props.status.grandTotal || 0);
    }
  });

  createEffect(() => {
    if (!props.status || !props.status.planCycle) return;
    setCycle(getPaymentTypeCycle(props.status.planCycle));
  });

  createEffect(() => {
    if (!props.status) return;
    let date = props.status.nextPlanBillingDate!;
    if (currentSubscription() && currentSubscription().trialEnd && (new Date() < currentSubscription()!.trialEnd!)) {
      date = currentSubscription().trialEnd!;
    }
    setDueDate(new Date(date || ''));
  });

  createEffect(() => {
    if (!currentSubscription() || !currentSubscription().trialEnd) return;
    setTrialEnded(new Date() > currentSubscription().trialEnd!);
    setHadTrial(true);
  });

  createEffect(() => {
    if (!currentSubscription() || !currentSubscription().trialStart) return;
    setTrialStarted(new Date() > currentSubscription().trialStart!);
  });

  createEffect(() => {
    setInTrial(trialStarted() && !trialEnded());
  });

  function onDone() {
    props.onSuccess?.();
    closeModal();
  }

  const doneBtn = () => <Button label={'Done'} onClick={onDone}/>;

  const mobileFooter = () => mobile() ? <div classList={{
    [footerStyles.borderedFooter]: true,
    [footerStyles.secondary]: props.type === ViewType.ADD_LOCATION_ADDON,
    [footerStyles.tertiary]: reactivateFlow(),
  }}>{doneBtn()}</div> : undefined;
  const desktopFooter = () => !mobile() ? <div classList={{
    [styles.btnWrapper]: true,
    [styles.secondary]: props.type === ViewType.ADD_LOCATION_ADDON,
    [styles.tertiary]: reactivateFlow(),
  }}>{doneBtn()}</div> : <></>

  return <Modal footer={mobileFooter()} content={
    <div class={styles.wrapper}>
      <img src={party} alt={''}/>
      <span class={styles.textMd}>You're all set!</span>
      <Show when={addonUpgrade() || reactivateFlow()} keyed fallback={
        <>
          <span class={styles.textSm}>We sent you a confirmation.</span>
          <span class={styles.textLg}>We hope you enjoy your free trial!</span>
        </>
      }>
        <>
          <span class={styles.textSm}>We sent you an email confirmation and detailed receipt.</span>
          <div class={styles.receipt}>
            <Show when={addonUpgrade()} keyed>
              <div class={styles.bottomBorder}>
                <span><b>Add-ons:</b> {addonsLabel()}</span>
                <span><b>{cycle() === PaymentTypeEnum.Monthly ? 'Monthly' : 'Yearly'} Charge:</b> <Price price={locationSubtotal() + userSubtotal()}/></span>
              </div>
              <div>
                <span><b>Tax:</b> <Price price={props.status.totalTax || 0}/></span>
                <Show when={inTrial()} keyed fallback={
                  <span><b>Due Today:</b> <Price price={grandTotal()}/></span>
                }>
                  <span><b>Due <FormattedDate date={dueDate()}/>:</b> <Price price={grandTotal()}/></span>
                  <span><b>Due Today <span class={styles.trialDays}>(30 days free)</span>:</b> <Price price={0}/></span>
                </Show>
              </div>
            </Show>
            <Show when={reactivateFlow()} keyed>
              <div>
                <span><b>Subscription:</b> {cycle() === PaymentTypeEnum.Monthly ? SUBSCRIPTION_NAME_MONTHLY : SUBSCRIPTION_NAME_ANNUALY}</span>
                <span><b>Renewal Date:</b> <FormattedDate date={props.status.nextPlanBillingDate || new Date()}/></span>
                <span><b>Total paid today:</b> <Price price={props.status.grandTotalWithTax || 0}/></span>
              </div>
            </Show>
          </div>
        </>
      </Show>

      {desktopFooter()}
    </div>
  }/>
}
export default ConfirmationModal;
