import styles from "./SubscriptionDetails.module.scss";
import {productType, subscriptionTotal} from "../util/prices";
import {Show} from "solid-js";

interface SubscriptionDetailsProps {
  users: number;
  locations: number;
}

const SubscriptionDetails = (props: SubscriptionDetailsProps) => {
  return <>
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
  </>
}

export default SubscriptionDetails;
