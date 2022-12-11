import styles from './TeamModal.module.scss';
import footerStyles from '../comp/ModalFooter.module.scss';
import headerStyles from '../comp/ModalHeader.module.scss';
import generalStyles from '../style/general.module.scss';
import Modal, {StepModalProps} from "../comp/Modal";
import Button from "../comp/Button";
import {createEffect, createSignal, For, onMount, Setter, Show} from "solid-js";
import TrashIcon from "../comp/svg/TrashIcon";
import Input from "../comp/Input";
import Select from "../comp/Select";
import {teamPricePerMonth} from "../util/prices";
import {EMAIL, LOCATIONS, USERS} from "../util/constants";
import {User, ViewType} from "../type/types";
import teamState from "../state/team";
import locationState from "../state/location";
import {InviteUserDto, LocationDto} from "../generated/client";
import mobileState from "../state/mobile";
import TeamCircleIcon from "../comp/svg/TeamCircleIcon";
import {isAddonFlow, isEmail, isNotEmpty, isValidUser} from "../util/util";
import UsersApi from "../api/UsersApi";
import memberState from "../state/member";
import {handleServerError} from "../util/ErrorHandler";
import loadingState from "../state/loading";

interface TeamModalProps extends StepModalProps {
}

const TeamModal = (props: TeamModalProps) => {
  const {mobile} = mobileState;
  const {member} = memberState;
  const {locations} = locationState;
  const {setLoading} = loadingState;
  const {team, addUser, deleteUser, addLocation, deleteLocation, updateLocation, updateEmail, cleanUsers, updateLocationAtIdx} = teamState;
  const [nextBtnDisabled, setNextBtnDisabled] = createSignal(true);
  const [addUserBtnDisabled, setAddUserBtnDisabled] = createSignal(true);
  const [emailErr, setEmailErr] = createSignal([] as string[]);
  const [allowSkip, setAllowSkip] = createSignal(true);
  const [addonFlow, setAddonFlow] = createSignal(true);

  onMount(() => {
    if (!team[USERS].length) {
      addNewUser();
    }
    validate();
  });

  createEffect(() => {
    setAllowSkip(props.idx > 0);
  });

  createEffect(() => {
    setAddonFlow(isAddonFlow(props.type));
  });

  createEffect(() => {
    if (locations[LOCATIONS].length) {
      team[USERS].forEach(u => {
        if (u.locations && u.locations.length && u.locations[0] === undefined) {
          updateLocationAtIdx(u, locations[LOCATIONS][0], 0);
        }
      });
    }
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

  const isValidEmail = (email: string) => {
    return team[USERS].map(it => it.email).filter(it => it === email).length === 1;
  }

  const validate = () => {
    let valid = true;
    team[USERS].forEach(u => {
      if (!isValidUser(u)) {
        valid = false;
      }
      const idx = team[USERS].indexOf(u);
      if (u.email && !isValidEmail(u.email)) {
        setErrorMessage(setEmailErr, idx, 'A user with this email address already exists.');
        valid = false;
      } else if (valid) {
        setErrorMessage(setEmailErr, idx, '');
      }
    });
    setNextBtnDisabled(!valid);
    setAddUserBtnDisabled(!valid);
  }

  function remainingLocations(user: User) {
    if (locations[LOCATIONS].length === user.locations.length) return [];
    return locations[LOCATIONS].filter(it => !user?.locations.includes(it));
  }

  function onSkip() {
    cleanUsers();
    props.onNext?.();
  }

  async function onNext() {
    try {
      setLoading(true);
      await UsersApi.validateTeamUsers(team[USERS].map(it => {
        return {email: it.email, ownerId: member().id} as InviteUserDto
      }));
      setLoading(false);
      props.onNext?.();
    } catch (e) {
      await handleServerError(e);
      setLoading(false);
    }
  }

  function onUpdateEmail(user: User, value: string) {
    updateEmail(user, value);
    const idx = team[USERS].indexOf(user);

    if (isNotEmpty(value)) {
      if (!isEmail(value)) {
        setErrorMessage(setEmailErr, idx, 'Please input a valid email address.');
      } else {
        setErrorMessage(setEmailErr, idx, '');
      }
    } else {
      setErrorMessage(setEmailErr, idx, 'Please complete this field.');
    }
    validate();
  }

  function setErrorMessage(setter: Setter<string[]>, idx: number, value: string) {
    setter(old => {
      const temp = [...old];
      temp[idx] = value;
      return temp;
    });
  }

  function onDeleteUser(user: User) {
    deleteUser(user);
    validate();
  }

  function onAddNewUser() {
    addNewUser();
    validate();
  }

  return <Modal onBack={props.onBack}
                header={
                  <div class={headerStyles.wrapper}>
                    <span class={headerStyles.header}><Show when={addonFlow()} keyed><TeamCircleIcon/></Show>Add Your Team</span>
                    <Show when={addonFlow()} keyed fallback={<>
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
                              <span class={`${i() === 0 ? generalStyles.invisible : ''}`} onClick={() => onDeleteUser(user)}>
                                <TrashIcon/>
                              </span>
                            </div>

                            <div class={styles.formContent}>
                              <Input type={'text'} value={user.email} placeholder={'Email address'} errorMsg={emailErr()[i()]}
                                     onInputChange={(e) => onUpdateEmail(user, e)}/>
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
                        <Button label={'+ Add Another User'} onClick={() => onAddNewUser()} disabled={addUserBtnDisabled()}/>
                      </div>
                    </div>
                  </div>
                }
                footer={
                  <div classList={{[footerStyles.borderedFooter]: true, [footerStyles.secondary]: props.type === ViewType.ADD_LOCATION_ADDON}}>
                    <Button onClick={onNext} disabled={nextBtnDisabled()} label={'Next'}></Button>
                    <Show when={allowSkip()} keyed>
                      <span onClick={onSkip}>Skip this step {'>'}</span>
                    </Show>
                  </div>
                }/>
}
export default TeamModal;
