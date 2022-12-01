import styles from './PauseConfirmationModal.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import openState from "../state/open";
import mobileState from "../state/mobile";
import CheckIcon from "../comp/svg/CheckIcon";
import {createEffect} from "solid-js";
import {Alert} from "../index";
import FormattedDate from "../comp/FormattedDate";

interface PauseConfirmationModalProps extends GenericModalProps {
  pauseDate: Date;
  resumeDate: Date;
  email: string;
  onSuccess?: () => void;
}

const PauseConfirmationModal = (props: PauseConfirmationModalProps) => {
  const {mobile} = mobileState;
  const {closeModal} = openState;

  createEffect(() => {
    Alert.show({text: 'Subscription successfully paused'});
  });

  function onDone() {
    props.onSuccess?.();
    closeModal();
  }

  return <Modal content={
    <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
      <span class={styles.textLg}>Pause Scheduled</span>

      <div class={styles.consequences}>
        <div>
          <div><CheckIcon/></div>
          <div>Your account will be paused on <b><FormattedDate date={props.pauseDate}/></b></div>
        </div>
        <div>
          <div><CheckIcon/></div>
          <div>You will not be charged again until <b><FormattedDate date={props.resumeDate}/></b></div>
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

      <Button label={'Ok'} secondary onClick={onDone}/>
    </div>
  }/>
}
export default PauseConfirmationModal;
