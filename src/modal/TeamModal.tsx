import styles from './TeamModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {createSignal, For} from "solid-js";
import TrashIcon from "../comp/svg/TrashIcon";
import Input from "../comp/Input";

interface TeamModalProps extends GenericModalProps {
}

const TeamModal = (props: TeamModalProps) => {
  function validateAndProceed() {

  }

  const [users, setUsers] = createSignal([{
    email: 'aa@nn.com',
    locations: ['caca', 'maca']
  }, {
    email: 'aa@nn.com',
    locations: ['caca', 'maca']
  }]);

  return <Modal onClose={props.onClose} content={
    <div class={styles.wrapper}>
      <span class={styles.topHeader}>Add Your Team</span>
      <span class={styles.topSubheader}>Try Teams for free for 30 days. Only $10/month per user after that.</span>
      <span class={styles.topSubheader}>New users will get an email invite.</span>

      <div class={styles.form}>
        <For each={users()}>{(user, i) =>
          <div>
            <div>
              <div class={styles.formHeader}>
                <span>New User Info</span>
                <TrashIcon/>
              </div>

              <div class={styles.formContent}>
                <Input type={'text'}/>
              </div>
            </div>
            <div>
              <div class={styles.formHeader}>
                <span>Location Assignment</span>
              </div>
            </div>
          </div>
        }</For>
      </div>
    </div>
  } footer={
    <div class={footerStyles.teamFooter}>
      <Button onClick={validateAndProceed} label={'Next'}></Button>
      <span onClick={props.onNext}>Skip this step {'>'}</span>
    </div>
  }/>
}
export default TeamModal;
