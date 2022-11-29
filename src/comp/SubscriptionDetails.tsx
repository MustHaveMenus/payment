import styles from "./SubscriptionDetails.module.scss";
import {productType, subscriptionTotal} from "../util/prices";
import {createEffect, createSignal, Show} from "solid-js";
import paymentTypeState from "../state/paymentType";
import AccountsApi from "../api/AccountsApi";
import memberState from "../state/member";
import {PaymentTypeEnum} from "../type/types";
import {SubStatusDtoPlanCycleEnum} from "../generated/client";
import {handleServerError} from "../util/ErrorHandler";
import {Spinner} from "./Spinner";

interface SubscriptionDetailsProps {
  users: number;
  locations: number;
}

const SubscriptionDetails = (props: SubscriptionDetailsProps) => {
  const [loading, setLoading] = createSignal(false);
  const {paymentType} = paymentTypeState;
  const {memberId} = memberState;

  createEffect(async () => {
    try {
      setLoading(true);
      const cycle = paymentType() === PaymentTypeEnum.Monthly ? SubStatusDtoPlanCycleEnum.Monthly : SubStatusDtoPlanCycleEnum.Yearly;
      const resp = await AccountsApi.changeSubscriptionPlan(memberId(), cycle, true);
      setLoading(false);
      console.log(resp);
    } catch (e: any) {
      setLoading(false);
      await handleServerError(e);
    }
  })

  return <>
    <Show when={!loading()} keyed fallback={<Spinner/>}>
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

      <Show when={(props.users || props.locations)} keyed>
        <div class={`${styles.paymentDetails} ${styles.topBorder}`}>
          <div class={styles.paymentDetailsHeader}>
            <span>Add-on</span>
            <span>Qty</span>
            <span>&nbsp;</span>
          </div>
          <Show when={props.users} keyed>
            <div class={styles.paymentDetailsEntry}>
              <div>Users</div>
              <div>{props.users}</div>
              <div>$240.00 / year</div>
            </div>
          </Show>
          <Show when={props.locations} keyed>
            <div class={styles.paymentDetailsEntry}>
              <div>Locations</div>
              <div>{props.locations}</div>
              <div>$120.00 / year</div>
            </div>
          </Show>
        </div>
      </Show>
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
    </Show>
  </>
}

export default SubscriptionDetails;
