import styles from './CancelConfirmationModal.module.scss';
import sadFace from '../assets/sad-face.webp';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import openState from "../state/open";
import mobileState from "../state/mobile";

interface CancelConfirmationModalProps extends GenericModalProps {
  expireDate: string;
  email: string;
}

const CancelConfirmationModal = (props: CancelConfirmationModalProps) => {
  const {mobile} = mobileState;
  const {closeModal} = openState;

  return <Modal content={
    <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
      <img src={sadFace} alt={''}/>
      <span class={styles.textLg}>We'll miss you!</span>
      <span class={`${styles.textMd} ${styles.smallMargin}`}>Your subscription has been cancelled, but you can still access your account until it expires on <b>{props.expireDate}</b></span>
      <span class={styles.textMd}>We sent a confirmation email to <b>{props.email}</b></span>

      <Button label={'Ok'} secondary onClick={closeModal}/>
    </div>
  }/>
}
export default CancelConfirmationModal;
