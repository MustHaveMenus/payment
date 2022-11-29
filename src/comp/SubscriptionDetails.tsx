import styles from "./SubscriptionDetails.module.scss";
import {subscriptionTotal} from "../util/prices";
import {createEffect, createSignal, Show} from "solid-js";
import paymentTypeState from "../state/paymentType";
import AccountsApi from "../api/AccountsApi";
import memberState from "../state/member";
import {PaymentTypeEnum} from "../type/types";
import {SubStatusDto, SubStatusDtoPlanCycleEnum} from "../generated/client";
import {handleServerError} from "../util/ErrorHandler";
import {Spinner} from "./Spinner";
import Price from "./Price";
import FormattedDate from "./FormattedDate";

interface SubscriptionDetailsProps {
  users: number;
  locations: number;
}

const SubscriptionDetails = (props: SubscriptionDetailsProps) => {
  const [loading, setLoading] = createSignal(false);
  const {paymentType} = paymentTypeState;
  const {memberId} = memberState;
  const [status, setStatus] = createSignal({} as SubStatusDto);

  createEffect(async () => {
    try {
      setLoading(true);
      const cycle = paymentType() === PaymentTypeEnum.Monthly ? SubStatusDtoPlanCycleEnum.Monthly : SubStatusDtoPlanCycleEnum.Yearly;
      setStatus(await AccountsApi.changeSubscriptionPlan(memberId(), cycle, true));
      setLoading(false);
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
          <div>{paymentType() === PaymentTypeEnum.Monthly ? 'Pro Monthly' : 'Pro Annual'}</div>
          <div><Price price={status().planTotal || 0} type={paymentType()}/></div>
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
          <div>Subtotal:</div>
          <div><Price price={status().grandTotal || 0}/></div>
        </div>
        <div class={styles.paymentDetailsEntry}>
          <div>Tax:</div>
          <div><Price price={0}/></div>
        </div>

        <div class={`${styles.paymentDetailsEntry} ${styles.topMargin}`}>
          <div>Due <FormattedDate date={new Date(status().nextPlanBillingDate!)}/></div>
          <div><Price price={status().grandTotal || 0}/></div>
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
