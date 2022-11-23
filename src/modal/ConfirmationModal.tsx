import styles from './ConfirmationModal.module.scss';
import party from '../assets/party.webp';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import openState from "../state/open";

interface ConfirmationModalProps extends GenericModalProps {
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {closeModal} = openState;
  return <Modal content={
    <div class={styles.wrapper}>
      <img src={party} alt={''}/>
      <span class={styles.textMd}>You're all set!</span>
      <span class={styles.textSm}>We sent you a confirmation.</span>
      <span class={styles.textLg}>We hope you enjoy your free trial!</span>

      <Button class={styles.btn} label={'Done'} onClick={closeModal}/>
    </div>
  }/>
}
export default ConfirmationModal;
