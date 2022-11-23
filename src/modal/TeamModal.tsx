import styles from './TeamModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {For, onMount, Show} from "solid-js";
import TrashIcon from "../comp/svg/TrashIcon";
import Input from "../comp/Input";
import Select from "../comp/Select";
import {removeIndex, replaceAtIndex} from "../util/util";
import {teamPricePerMonth} from "../util/prices";
import {EMAIL, LOCATIONS, USERS} from "../util/constants";
import {User} from "../type/types";
import {locationState, teamState} from "../state/state";

interface TeamModalProps extends GenericModalProps {
}

const TeamModal = (props: TeamModalProps) => {
  const {locations, setLocations} = locationState;
  const [team, setTeam] = teamState;

  onMount(() => {
    setTimeout(() => {
      setLocations(['caca', 'maca', 'vaca', 'laca']);
      onAddUser();
    }, 1000);
  })

  function newUser() {
    return {
      [EMAIL]: '',
      [LOCATIONS]: [newLocation()]
    } as User;
  }

  function newLocation(user?: User) {
    if (!user) return locations().at(0)!;
    return remainingLocations(user).at(0)!;
  }

  function validateAndProceed() {

  }

  function onAddLocation(user: User) {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, idx, LOCATIONS, prev => [...prev, newLocation(user)]);
  }

  function onLocationChange(user: User, oldLoc: string, loc: string) {
    const userIdx = team[USERS].indexOf(user);
    const locationIdx = team[USERS].at(userIdx)?.locations.indexOf(oldLoc) ?? -1;
    setTeam(USERS, userIdx, LOCATIONS, prev => replaceAtIndex(prev, locationIdx, loc));
  }

  function onDeleteLocation(user: User, loc: string) {
    const userIdx = team[USERS].indexOf(user);
    const locationIdx = team[USERS].at(userIdx)?.locations.indexOf(loc) ?? -1;
    setTeam(USERS, userIdx, LOCATIONS, prev => removeIndex(prev, locationIdx));
  }

  function onAddUser() {
    setTeam(USERS, users => [...users, newUser()]);
  }

  function onDeleteUser(user: User) {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, users => removeIndex(users, idx));
  }

  function onEmailChange(e: KeyboardEvent, user: User) {
    const idx = team[USERS].indexOf(user);
    setTeam(USERS, idx, EMAIL, () => (e.target as HTMLInputElement)?.value ?? '');
  }

  function remainingLocations(user: User) {
    if (locations().length === user.locations.length) return [];
    return locations().filter(it => !user?.locations.includes(it));
  }

  return <Modal onClose={props.onClose}
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
                              <span class={`${i() === 0 ? styles.invisible : ''}`} onClick={[onDeleteUser, user]}>
                                <TrashIcon/>
                              </span>
                            </div>

                            <div class={styles.formContent}>
                              <Input type={'text'} value={user.email} placeholder={'Email address'} onKeyUp={(e) => onEmailChange(e, user)}/>
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
                                  <Select values={locations()} disabledValues={user.locations} value={loc}
                                          onChange={(newLoc) => onLocationChange(user, loc, newLoc)}/>
                                  <span class={`${i() === 0 ? styles.invisible : ''}`} onClick={() => onDeleteLocation(user, loc)}>
                                    <TrashIcon/>
                                  </span>
                                </div>
                              }</For>
                              <Show when={remainingLocations(user).length} keyed>
                                <div class={styles.addLocation}>
                                  <span onClick={[onAddLocation, user]}>+ Location Assignment</span>
                                </div>
                              </Show>
                            </div>
                          </div>
                        </div>
                      }</For>

                      <Button class={styles.addUser} label={'+ Add Another User'} onClick={onAddUser}/>
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
