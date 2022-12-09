import styles from "./SubscriptionDetails.module.scss";
import {createEffect, createSignal, Show} from "solid-js";
import paymentTypeState from "../state/paymentType";
import {PaymentTypeEnum, ViewType} from "../type/types";
import {SubStatusDto, SubStatusDtoAddonsCycleEnum} from "../generated/client";
import {Spinner} from "./Spinner";
import Price from "./Price";
import {SUBSCRIPTION_NAME_ANNUALY, SUBSCRIPTION_NAME_MONTHLY} from "../util/constants";
import {isReactivateFlow} from "../util/util";
import currentSubscriptionState from "../state/currentSubscription";
import FormattedDate from "./FormattedDate";

interface SubscriptionDetailsProps {
  users: number;
  locations: number;
  status: SubStatusDto;
  loading: boolean;
  type: ViewType;
}

const SubscriptionDetails = (props: SubscriptionDetailsProps) => {
  const {paymentType} = paymentTypeState;
  const [addonUpgrade, setAddonUpgrade] = createSignal(false);
  const [reactivateFlow, setReactivateFlow] = createSignal(false);
  const [subtotal, setSubtotal] = createSignal(0.0);
  const [tax, setTax] = createSignal(0.0);
  const [grandTotal, setGrandTotal] = createSignal(0.0);
  const [dueToday, setDueToday] = createSignal(undefined as number | undefined);
  const [dueDateAmount, setDueDateAmount] = createSignal(undefined as number | undefined);
  const [showTrialForToday, setShowTrialForToday] = createSignal(false);
  const [userSubtotal, setUserSubtotal] = createSignal(0.0);
  const [locationSubtotal, setLocationSubtotal] = createSignal(0.0);
  const [dueDate, setDueDate] = createSignal(undefined as Date | undefined);
  const [trialEnded, setTrialEnded] = createSignal(true);
  const [trialStarted, setTrialStarted] = createSignal(false);
  const [hadTrial, setHadTrial] = createSignal(false);
  const [inTrial, setInTrial] = createSignal(false);
  const [showDueToday, setShowDueToday] = createSignal(false);
  const [showDueOnDate, setShowDueOnDate] = createSignal(false);
  const {currentSubscription} = currentSubscriptionState;

  createEffect(() => {
    if (!props.status.plan) return;
    console.log('props.status', props.status)
    console.log('current sub', currentSubscription());
  });

  createEffect(() => {
    setTax(props.status.totalTax || 0);
  });

  createEffect(() => {
    setAddonUpgrade(paymentType() == PaymentTypeEnum.None);
  });

  createEffect(() => {
    setReactivateFlow(isReactivateFlow(props.type));
  });

  createEffect(() => {
    console.log(props.status.grandTotal);
    if (!props.status || !props.status.grandTotal) return;

    if (addonUpgrade()) {
      //setSubtotal(userSubtotal() + locationSubtotal());
      setSubtotal(props.status.grandTotal);
    } else {
      setSubtotal(props.status.grandTotal || 0);
    }

    console.log('subtotal', props.status.grandTotal);
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
    setGrandTotal(subtotal() + tax());
    console.log('grand total', subtotal() + tax());
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
    console.log('trial ended', new Date() > currentSubscription().trialEnd!)
  });

  createEffect(() => {
    if (!currentSubscription() || !currentSubscription().trialStart) return;
    setTrialStarted(new Date() > currentSubscription().trialStart!);
    console.log('trial started', new Date() > currentSubscription().trialStart!)
  });

  createEffect(() => {
    setInTrial(trialStarted() && !trialEnded());
    console.log('in trial', trialStarted() && !trialEnded())
  });

  createEffect(() => {
    setHadTrial(trialStarted() && trialEnded());
    console.log('had trial', trialStarted() && trialEnded())
  })

  createEffect(() => {
    setShowDueToday(dueToday() !== undefined);
  });

  createEffect(() => {
    setShowDueOnDate(!!(dueDate() && dueDateAmount()));
  });

  createEffect(() => {
    if (!props.status) return;
    if ((inTrial() || !hadTrial()) && !reactivateFlow()) {
      setDueToday(0);
      setDueDateAmount(grandTotal() || 0);
      setShowTrialForToday(true);
    } else {
      setDueToday(grandTotal() || 0);
      setShowTrialForToday(false);
    }
  });

  function getPaymentType(status: SubStatusDtoAddonsCycleEnum) {
    switch (status) {
      case "Yearly":
        return PaymentTypeEnum.Annually;
      case "Monthly":
        return PaymentTypeEnum.Monthly;
      default:
        return PaymentTypeEnum.None;
    }
  }

  return <>
    <Show when={!props.loading} keyed fallback={<Spinner/>}>
      <span class={styles.topHeader}>Subscription Details</span>

      <Show when={!addonUpgrade()} keyed>
        <div class={styles.paymentDetails}>
          <div class={styles.paymentDetailsHeader}>
            <span>Subscription</span>
          </div>
          <div class={styles.paymentDetailsEntry}>
            <div>{paymentType() === PaymentTypeEnum.Monthly ? SUBSCRIPTION_NAME_MONTHLY : SUBSCRIPTION_NAME_ANNUALY}</div>
            <div><Price price={props.status.planTotal || 0} type={paymentType()}/></div>
          </div>
        </div>
      </Show>

      <Show when={(props.users || props.locations)} keyed>
        <div classList={{[styles.paymentDetails]: true, [styles.topBorder]: paymentType() !== PaymentTypeEnum.None}}>
          <div class={styles.paymentDetailsHeader}>
            <span>Add-on</span>
            <span>Qty</span>
            <span>&nbsp;</span>
          </div>
          <Show when={props.users} keyed>
            <div class={styles.paymentDetailsEntry}>
              <div>Users</div>
              <div>{props.users}</div>
              <div><Price price={userSubtotal()} type={getPaymentType(props.status.addonsCycle!)}/></div>
            </div>
          </Show>
          <Show when={props.locations} keyed>
            <div class={styles.paymentDetailsEntry}>
              <div>Locations</div>
              <div>{props.locations}</div>
              <div><Price price={locationSubtotal()} type={getPaymentType(props.status.addonsCycle!)}/></div>
            </div>
          </Show>
        </div>
      </Show>





      <div class={`${styles.paymentDetails} ${styles.topBorder}`}>
        <div class={styles.paymentDetailsEntry}>
          <div>Subtotal:</div>
          <div><Price price={subtotal()}/></div>
        </div>
        <div class={styles.paymentDetailsEntry}>
          <div>Tax:</div>
          <div><Price price={tax()}/></div>
        </div>




        <Show keyed when={showDueOnDate()}>
          <div classList={{
            [styles.paymentDetailsEntry]: true,
            [styles.total]: true,
            [styles.topMargin]: showDueToday()
          }}>
            <div>Due <FormattedDate date={dueDate()!}/></div>
            <div><Price price={dueDateAmount()!}/></div>
          </div>
        </Show>

        <Show when={showDueToday()} keyed>
          <div classList={{
            [styles.paymentDetailsEntry]: true,
            [styles.total]: true
          }}>
            <div>
              Due today
                <Show when={showTrialForToday()} keyed>
                  <span class={styles.trialDays}> (30 days free)</span>
                </Show>
                :
            </div>
            <div><Price price={dueToday()!}/></div>
          </div>
        </Show>

      </div>
    </Show>
  </>
}

export default SubscriptionDetails;
