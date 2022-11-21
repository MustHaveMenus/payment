import styles from './Payment.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";

interface PaymentModalProps extends GenericModalProps {
}

const PaymentModal = ({onNext, onBack, onClose}: PaymentModalProps) => {
  return <Modal onClose={onClose} onBack={onBack} content={
    <div class={styles.wrapper}>
      <div class={styles.leftSide}>
        left
      </div>
      <div class={styles.rightSide}>
        right
      </div>
    </div>
  }/>
}
export default PaymentModal;
