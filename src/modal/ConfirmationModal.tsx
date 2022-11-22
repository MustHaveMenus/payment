import styles from './ConfirmationModal.module.scss';
import party from '../assets/party.webp';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";

interface ConfirmationModalProps extends GenericModalProps {
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  return <Modal onClose={props.onClose} content={
    <div class={styles.wrapper}>
      <img src={party} alt={''}/>
      <span class={styles.textMd}>You're all set!</span>
      <span class={styles.textSm}>We sent you a confirmation.</span>
      <span class={styles.textLg}>We hope you enjoy your free trial!</span>

      <Button class={styles.btn} label={'Done'} onClick={props.onClose}/>
    </div>
  }/>
}
export default ConfirmationModal;
