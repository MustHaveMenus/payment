import styles from './ConfirmationModal.module.scss';
import party from '../assets/party.webp';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import openState from "../state/open";
import footerStyles from "../comp/ModalFooter.module.scss";
import mobileState from "../state/mobile";

interface ConfirmationModalProps extends GenericModalProps {
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {closeModal} = openState;
  const {mobile} = mobileState;

  const doneBtn = () => <Button class={styles.btn} label={'Done'} onClick={closeModal}/>;

  const mobileFooter = () => mobile() ? <div class={footerStyles.borderedFooter}>{doneBtn()}</div> : undefined;
  const desktopFooter = () => !mobile() ? doneBtn() : <></>

  return <Modal footer={mobileFooter()} content={
    <div class={styles.wrapper}>
      <img src={party} alt={''}/>
      <span class={styles.textMd}>You're all set!</span>
      <span class={styles.textSm}>We sent you a confirmation.</span>
      <span class={styles.textLg}>We hope you enjoy your free trial!</span>

      {desktopFooter()}
    </div>
  }/>
}
export default ConfirmationModal;
