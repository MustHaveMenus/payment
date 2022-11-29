import styles from './PauseConfirmationModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import openState from "../state/open";
import mobileState from "../state/mobile";
import CheckIcon from "../comp/svg/CheckIcon";
import {createEffect} from "solid-js";
import {Alert} from "../index";

interface PauseConfirmationModalProps extends GenericModalProps {
  pauseDate: string;
  resumeDate: string;
  email: string;
}

const PauseConfirmationModal = (props: PauseConfirmationModalProps) => {
  const {mobile} = mobileState;
  const {closeModal} = openState;

  createEffect(() => {
    Alert.show({text: 'Subscription successfully paused'});
  });

  return <Modal content={
    <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
      <span class={styles.textLg}>Pause Scheduled</span>

      <div class={styles.consequences}>
        <div>
          <div><CheckIcon/></div>
          <div>Your account will be paused on <b>{props.pauseDate}</b></div>
        </div>
        <div>
          <div><CheckIcon/></div>
          <div>You will not be charged again until <b>{props.resumeDate}</b></div>
        </div>
        <div>
          <div><CheckIcon/></div>
          <div>A confirmation email has been sent to <b>{props.email}</b></div>
        </div>
        <div>
          <div><CheckIcon/></div>
          <div>You can log in to resume or cancel at any time</div>
        </div>
      </div>

      <Button label={'Ok'} secondary onClick={closeModal}/>
    </div>
  }/>
}
export default PauseConfirmationModal;