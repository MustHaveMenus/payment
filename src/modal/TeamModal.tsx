import styles from './TeamModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {For, onMount, Show} from "solid-js";
import TrashIcon from "../comp/svg/TrashIcon";
import Input from "../comp/Input";
import Select from "../comp/Select";
import {teamPricePerMonth} from "../util/prices";
import {EMAIL, LOCATIONS, USERS} from "../util/constants";
import {User} from "../type/types";
import teamState from "../state/team";
import locationState from "../state/location";

interface TeamModalProps extends GenericModalProps {
}

const TeamModal = (props: TeamModalProps) => {
  const {locations, addLocations} = locationState;
  const {team, addUser, deleteUser, addLocation, deleteLocation, updateLocation, updateEmail} = teamState;

  onMount(() => {
    setTimeout(() => {
      addLocations([
        {name: 'caca', value: 'caca', label: 'caca'},
        {name: 'maca', value: 'maca', label: 'maca'},
        {name: 'vaca', label: 'vaca', value: 'vaca'},
        {name: 'laca', value: 'laca', label: 'laca'}]);
      addNewUser();
    }, 1000);
  });

  function newUser() {
    return {
      [EMAIL]: '',
      [LOCATIONS]: [newLocation()]
    } as User;
  }

  function addNewUser() {
    addUser(newUser());
  }

  function newLocation(user?: User) {
    if (!user) return locations[LOCATIONS].at(0)!;
    return remainingLocations(user).at(0)!;
  }

  function validateAndProceed() {

  }

  function remainingLocations(user: User) {
    if (locations[LOCATIONS].length === user.locations.length) return [];
    return locations[LOCATIONS].filter(it => !user?.locations.includes(it));
  }

  return <Modal
    header={
      <div class={headerStyles.wrapper}>
        <span class={headerStyles.header}>Add Your Team</span>
        <span class={headerStyles.subheader}>Try Teams for free for 30 days. Only ${teamPricePerMonth}/month per user after that.</span>
        <span class={headerStyles.subheader}>New users will get an email invite.</span>
      </div>
    }
    content={
      <div class={styles.wrapper}>
        <div class={styles.form}>
          <For each={team[USERS]}>{(user, i) =>
            <div class={styles.entry}>
              <div>
                <div class={styles.formHeader}>
                  <span>New User Info</span>
                  <span class={`${i() === 0 ? styles.invisible : ''}`} onClick={[deleteUser, user]}>
                                <TrashIcon/>
                              </span>
                </div>

                <div class={styles.formContent}>
                  <Input type={'text'} value={user.email} placeholder={'Email address'}
                         onKeyUp={(e) => updateEmail(user, (e.target as HTMLInputElement)?.value ?? '')}/>
                </div>
              </div>
              <div>
                <div class={styles.formHeader}>
                  <span>Location Assignment</span>
                  <span class={styles.invisible}>
                                <TrashIcon/>
                              </span>
                </div>
                <div class={styles.formContent}>
                  <For each={user.locations}>{(loc, i) =>
                    <div class={styles.locationEntry}>
                      <Select values={locations[LOCATIONS]} disabledValues={user.locations} value={loc}
                              onChange={(newLoc) => updateLocation(user, loc, newLoc)}/>
                      <span class={`${i() === 0 ? styles.invisible : ''}`} onClick={() => deleteLocation(user, loc)}>
                                    <TrashIcon/>
                                  </span>
                    </div>
                  }</For>
                  <Show when={remainingLocations(user).length} keyed>
                    <div class={styles.addLocation}>
                      <span onClick={() => addLocation(user, newLocation(user))}>+ Location Assignment</span>
                    </div>
                  </Show>
                </div>
              </div>
            </div>
          }</For>

          <Button class={styles.addUser} label={'+ Add Another User'} onClick={addNewUser}/>
        </div>
      </div>
    }
    footer={
      <div class={footerStyles.teamFooter}>
        <Button onClick={validateAndProceed} label={'Next'}></Button>
        <span onClick={props.onNext}>Skip this step {'>'}</span>
      </div>
    }/>
}
export default TeamModal;
