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
import viewState from "../state/view";
import OverviewReactivateModal from "./OverviewReactivateModal";

export interface SetupProps {
  type: ViewType;
  memberId: string;
}

export interface PrivateSetupProps extends SetupProps {
  onClose: () => void;
}

const Setup = (props: PrivateSetupProps) => {
  const [steps, setSteps] = createSignal([] as View[]);
  const {view, setView} = viewState;
  const {setMobile} = mobileState;
  const {opened, openModal} = openState;
  const {memberId, setMemberId} = memberState;
  const {addLocations} = locationsState;
  const [locationsServer] = createResource(memberId, AccountsApi.getLocations);

  createEffect(() => {
    if (!props.type) return;

    setSteps(Steps[props.type]);
    setView(Steps[props.type][0]);
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
    const currentIdx = steps().findIndex((it => it === view()));
    if (currentIdx < steps().length - 1) {
      setView(steps()[currentIdx + 1]);
    }
  }

  function onBack() {
    const currentIdx = steps().findIndex((it => it === view()));
    if (currentIdx > 0) {
      setView(steps()[currentIdx - 1]);
    }
  }

  return <>
    <div id={'mob-detect'}/>

    <Switch>
      <Match when={View.OVERVIEW === view()} keyed><OverviewModal onNext={onNext}/></Match>
      <Match when={View.OVERVIEW_REACTIVATE === view()} keyed><OverviewReactivateModal onNext={onNext}/></Match>
      <Match when={View.LOCATION === view()} keyed><LocationModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.TEAM === view()} keyed><TeamModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.PAYMENT === view()} keyed><PaymentModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.CONFIRMATION === view()} keyed><ConfirmationModal/></Match>
    </Switch>
  </>
}
export default Setup;
