import styles from './TeamModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {createSignal, For} from "solid-js";
import TrashIcon from "../comp/svg/TrashIcon";
import Input from "../comp/Input";
import Select from "../comp/Select";

interface TeamModalProps extends GenericModalProps {
}

const TeamModal = (props: TeamModalProps) => {
  const [locations, setLocations] = createSignal(['caca', 'maca']);

  function validateAndProceed() {

  }

  const [users, setUsers] = createSignal([{
    email: 'aa@nn.com',
    locations: ['caca', 'maca']
  }, {
    email: 'xxx@nn.com',
    locations: ['caca', 'maca']
  }]);

  return <Modal onClose={props.onClose}
                header={
                  <div class={headerStyles.wrapper}>
                    <span class={headerStyles.header}>Add Your Team</span>
                    <span class={headerStyles.subheader}>Try Teams for free for 30 days. Only $10/month per user after that.</span>
                    <span class={headerStyles.subheader}>New users will get an email invite.</span>
                  </div>
                }
                content={
                  <div class={styles.wrapper}>
                    <div class={styles.form}>
                      <For each={users()}>{(user, i) =>
                        <div class={styles.entry}>
                          <div>
                            <div class={styles.formHeader}>
                              <span>New User Info</span>
                              <span class={`${i() === 0 ? styles.invisible : ''}`}>
                                <TrashIcon/>
                              </span>
                            </div>

                            <div class={styles.formContent}>
                              <Input type={'text'} value={user.email}/>
                            </div>
                          </div>
                          <div>
                            <div class={styles.formHeader}>
                              <span>Location Assignment</span>
                            </div>
                            <div class={styles.formContent}>
                              <For each={user.locations}>{(loc, i) =>
                                <div class={styles.locationEntry}>
                                  <Select values={locations()} value={loc}/>
                                  <span class={`${i() === 0 ? styles.invisible : ''}`}>
                                    <TrashIcon/>
                                  </span>
                                </div>
                              }</For>
                              <div class={styles.addLocation}>
                                <span>+ Location Assignment</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      }</For>

                      <Button class={styles.addUser} label={'+ Add Another User'}/>
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
