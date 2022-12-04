import styles from "./SubscriptionDetails.module.scss";
import {createEffect, createSignal, Show} from "solid-js";
import paymentTypeState from "../state/paymentType";
import {PaymentTypeEnum} from "../type/types";
import {SubStatusDto, SubStatusDtoAddonsCycleEnum} from "../generated/client";
import {Spinner} from "./Spinner";
import Price from "./Price";
import FormattedDate from "./FormattedDate";

interface SubscriptionDetailsProps {
  users: number;
  locations: number;
  status: SubStatusDto;
  loading: boolean;
}

const SubscriptionDetails = (props: SubscriptionDetailsProps) => {
  const {paymentType} = paymentTypeState;
  const [addonUpgrade, setAddonUpgrade] = createSignal(false);
  const [subtotal, setSubtotal] = createSignal(0.0);
  const [grandTotal, setGrandTotal] = createSignal(0.0);
  const [userSubtotal, setUserSubtotal] = createSignal(0.0);
  const [locationSubtotal, setLocationSubtotal] = createSignal(0.0);

  createEffect(() => {
    setAddonUpgrade(paymentType() == PaymentTypeEnum.None);
  });

  createEffect(() => {
    if (!props.status || !props.status.grandTotal) return;

    if (addonUpgrade()) {
      setSubtotal(userSubtotal() + locationSubtotal());
    } else {
      setSubtotal(props.status.grandTotal || 0);
    }
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
            <div>{paymentType() === PaymentTypeEnum.Monthly ? 'Pro Monthly' : 'Pro Annual'}</div>
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
          <div><Price price={props.status.totalTax || 0}/></div>
        </div>

        <div class={`${styles.paymentDetailsEntry} ${styles.topMargin}`}>
          <div>Due <FormattedDate date={new Date(props.status.nextPlanBillingDate!)}/></div>
          <div><Price price={grandTotal()}/></div>
        </div>
        <div class={styles.paymentDetailsEntry}>
          <div><b>Due Today <span class={styles.trialDays}>(30 days free)</span>:</b></div>
          <div><b><Price price={0}/></b></div>
        </div>
      </div>
    </Show>
  </>
}

export default SubscriptionDetails;
