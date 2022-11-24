import {Steps, View, ViewType} from "../type/types";
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
  type: ViewType;
  memberId: string;
}

export interface PrivateSetupProps extends SetupProps {
  onClose: () => void;
}

const Setup = (props: PrivateSetupProps) => {
  const [steps, setSteps] = createSignal([] as View[]);
  const [currentView, setCurrentView] = createSignal(View.OVERVIEW);
  const {setMobile} = mobileState;
  const {opened, openModal} = openState;
  const {memberId, setMemberId} = memberState;
  const {addLocations} = locationsState;
  const [locationsServer] = createResource(memberId, AccountsApi.getLocations);

  createEffect(() => {
    if (!props.type) return;

    setSteps(Steps[props.type]);
  });

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
    const currentIdx = steps().findIndex((it => it === currentView()));
    if (currentIdx < steps().length - 1) {
      setCurrentView(steps()[currentIdx + 1]);
    }
  }

  function onBack() {
    const currentIdx = steps().findIndex((it => it === currentView()));
    if (currentIdx > 0) {
      setCurrentView(steps()[currentIdx - 1]);
    }
  }

  return <>
    <div id={'mob-detect'}/>

    <Switch>
      <Match when={View.OVERVIEW === currentView()} keyed><OverviewModal onNext={onNext}/></Match>
      <Match when={View.LOCATION === currentView()} keyed><LocationModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.TEAM === currentView()} keyed><TeamModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.PAYMENT === currentView()} keyed><PaymentModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.CONFIRMATION === currentView()} keyed><ConfirmationModal/></Match>
    </Switch>
  </>
}
export default Setup;
