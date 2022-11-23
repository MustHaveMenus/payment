import {View} from "../type/types";
import OverviewModal from "./OverviewModal";
import {createEffect, createResource, createSignal, Match, onCleanup, onMount, Switch} from "solid-js";
import PaymentModal from "./PaymentModal";
import ConfirmationModal from "./ConfirmationModal";
import TeamModal from "./TeamModal";
import LocationModal from "./LocationModal";
import mobileState from "../state/mobile";
import openState from "../state/open";
import AccountsApi from "../api/AccountsApi";
import memberState from "../state/member";
import locationsState from "../state/location";

export interface SetupProps {
  view?: View;
  memberId: string;
}

export interface PrivateSetupProps extends SetupProps {
  onClose: () => void;
}

const Setup = (props: PrivateSetupProps) => {
  const [currentView, setCurrentView] = createSignal(props.view ?? View.OVERVIEW);
  const {setMobile} = mobileState;
  const {opened, openModal} = openState;
  const {memberId, setMemberId} = memberState;
  const {addLocations} = locationsState;
  const [locationsServer] = createResource(memberId, AccountsApi.getLocations);

  createEffect(() => {
    const resp = locationsServer();
    if (!resp) return;
    addLocations(resp);
  })

  const detectMobile = () => {
    const elem = document.getElementById('mob-detect');
    if (!elem) return;
    setMobile(window.getComputedStyle(elem).display === 'block');
  };

  onMount(() => {
    detectMobile();
    setMemberId(props.memberId);
  });

  createEffect(() => {
    const event = 'resize';
    window.addEventListener(event, detectMobile);
    onCleanup(() => window.removeEventListener(event, detectMobile));
  });

  createEffect(() => {
    if (!opened()) {
      props.onClose();
      openModal();
    }
  })

  function onNext() {
    if (currentView() === View.PAYMENT) {
      setCurrentView(View.CONFIRMATION)
      return;
    }
    if (currentView() === View.LOCATION) {
      setCurrentView(View.TEAM)
      return;
    }
    setCurrentView(View.PAYMENT);
  }

  function onBack() {
    setCurrentView(View.OVERVIEW);
  }

  return <>
    <div id={'mob-detect'}/>

    <Switch>
      <Match when={View.OVERVIEW === currentView()} keyed><OverviewModal onNext={onNext}/></Match>
      <Match when={View.PAYMENT === currentView()} keyed><PaymentModal onNext={onNext} onBack={onBack}/></Match>
      <Match when={View.CONFIRMATION === currentView()} keyed><ConfirmationModal onNext={onNext}/></Match>
      <Match when={View.TEAM === currentView()} keyed><TeamModal onNext={onNext}/></Match>
      <Match when={View.LOCATION === currentView()} keyed><LocationModal onNext={onNext} onBack={onBack}/></Match>
    </Switch>
  </>
}
export default Setup;
