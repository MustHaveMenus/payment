import styles from './ConfirmationModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";

interface ConfirmationModalProps extends GenericModalProps {
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  return <Modal onClose={props.onClose} onBack={props.onBack} content={
    <div class={styles.wrapper}>
      <span>img</span>
      <span class={styles.textMd}>You're all set!</span>
      <span class={styles.textSm}>We sent you a confirmation.</span>
      <span class={styles.textLg}>We hope you enjoy your free trial!</span>

      <Button class={styles.btn} label={'Done'}/>
    </div>
  }/>
}
export default ConfirmationModal;
