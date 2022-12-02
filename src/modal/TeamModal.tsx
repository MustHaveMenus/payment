import styles from './TeamModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import generalStyles from '../style/general.module.scss';
import Modal, {GenericModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {createEffect, For, Show} from "solid-js";
import TrashIcon from "../comp/svg/TrashIcon";
import Input from "../comp/Input";
import Select from "../comp/Select";
import {teamPricePerMonth} from "../util/prices";
import {EMAIL, LOCATIONS, USERS} from "../util/constants";
import {User} from "../type/types";
import teamState from "../state/team";
import locationState from "../state/location";
import {LocationDto} from "../generated/client";
import mobileState from "../state/mobile";
import TeamCircleIcon from "../comp/svg/TeamCircleIcon";

interface TeamModalProps extends GenericModalProps {
  secondary?: boolean;
}

const TeamModal = (props: TeamModalProps) => {
  const {mobile} = mobileState;
  const {locations, addLocations} = locationState;
  const {team, addUser, deleteUser, addLocation, deleteLocation, updateLocation, updateEmail} = teamState;

  createEffect(() => {
    if (!locations[LOCATIONS].length) return;
    addNewUser();
  })

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
    props.onNext?.();
  }

  function remainingLocations(user: User) {
    if (locations[LOCATIONS].length === user.locations.length) return [];
    return locations[LOCATIONS].filter(it => !user?.locations.includes(it));
  }

  return <Modal onBack={props.onBack}
                header={
                  <div class={headerStyles.wrapper}>
                    <span class={headerStyles.header}><Show when={props.secondary} keyed><TeamCircleIcon/></Show>Add Your Team</span>
                    <Show when={props.secondary} keyed fallback={<>
                      <span class={headerStyles.subheader}>Try Teams for free for 30 days. Only ${teamPricePerMonth}/month per user after that.</span>
                      <span class={headerStyles.subheader}>New users will get an email invite.</span>
                    </>}>
                      <span
                        class={headerStyles.subheader}>Work better, together. Add your team for ${teamPricePerMonth}/month per user. New users will get an email invite.</span>
                    </Show>
                  </div>
                }
                content={
                  <div classList={{[styles.wrapper]: true, [styles.mobile]: mobile()}}>
                    <div class={styles.form}>
                      <For each={team[USERS]}>{(user, i) =>
                        <div class={styles.entry}>
                          <div>
                            <div class={styles.formHeader}>
                              <span>New User Info</span>
                              <span class={`${i() === 0 ? generalStyles.invisible : ''}`} onClick={[deleteUser, user]}>
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
                              <span class={generalStyles.invisible}>
                                <TrashIcon/>
                              </span>
                            </div>
                            <div class={styles.formContent}>
                              <For each={user.locations}>{(loc, i) =>
                                <div class={styles.locationEntry}>
                                  <Select values={locations[LOCATIONS]} disabledValues={user.locations} value={loc}
                                          onChange={(newLoc) => updateLocation(user, loc, newLoc as LocationDto)}/>
                                  <Show when={!mobile() || i() > 0} keyed>
                                    <span class={`${i() === 0 ? generalStyles.invisible : ''}`} onClick={() => deleteLocation(user, loc)}>
                                      <TrashIcon/>
                                    </span>
                                  </Show>
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

                      <div class={styles.addUserWrapper}>
                        <Button label={'+ Add Another User'} onClick={addNewUser}/>
                      </div>
                    </div>
                  </div>
                }
                footer={
                  <div classList={{[footerStyles.borderedFooter]: true, [footerStyles.secondary]: props.secondary}}>
                    <Button onClick={validateAndProceed} label={'Next'}></Button>
                    <span onClick={props.onNext}>Skip this step {'>'}</span>
                  </div>
                }/>
}
export default TeamModal;
