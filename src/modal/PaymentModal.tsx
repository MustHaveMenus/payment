import styles from './PaymentModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";

interface PaymentModalProps extends GenericModalProps {
}

const PaymentModal = (props: PaymentModalProps) => {
  return <Modal onClose={props.onClose} onBack={props.onBack} content={
    <div class={styles.wrapper}>
      <div class={styles.left}>
        <span class={styles.topHeader}>Try Pro Plan for free</span>
        <span class={styles.topSubheader}>30-day free trial, cancel at any time</span>
        <span class={styles.topSubheader}>We'll remind you before your trial ends</span>
      </div>
      <div class={styles.right}>
        right
      </div>
    </div>
  }/>
}
export default PaymentModal;
