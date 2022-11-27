import {cancelSteps, Decision, reactivateSteps, Steps, View, ViewType} from "../type/types";
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
import ConfirmCancelModal from "./ConfirmCancelModal";
import CancelConfirmationModal from "./CancelConfirmationModal";
import PaymentReactivateModal from "./PaymentReactivateModal";
import PauseModal from "./PauseModal";

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
    try {
      const resp = locationsServer();
      if (!resp) return;
      addLocations(resp);
    } catch (e) {
      console.error(e);
    }
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

  function onDecisionMade(dec: Decision) {
    switch (dec) {
      case Decision.CANCEL: {
        setSteps(cancelSteps);
        setView(cancelSteps[1]);
        break;
      }
      case Decision.REACTIVATE: {
        setSteps(reactivateSteps);
        setView(reactivateSteps[1]);
        break;
      }
      case Decision.CONFIRM_CANCEL: {
        onNext();
      }
      case Decision.BACK_TO_ACCOUNT: {

      }
    }
  }

  return <>
    <div id={'mob-detect'}/>

    <Switch>
      <Match when={View.OVERVIEW === view()} keyed><OverviewModal onNext={onNext}/></Match>
      <Match when={View.OVERVIEW_REACTIVATE === view()} keyed><OverviewReactivateModal onDecision={onDecisionMade}/></Match>
      <Match when={View.LOCATION === view()} keyed><LocationModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.TEAM === view()} keyed><TeamModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.PAYMENT === view()} keyed><PaymentModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.PAYMENT_REACTIVATE === view()} keyed><PaymentReactivateModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.CONFIRMATION === view()} keyed><ConfirmationModal/></Match>
      <Match when={View.CONFIRM_CANCEL === view()} keyed><ConfirmCancelModal onDecision={onDecisionMade} onBack={onBack} /></Match>
      <Match when={View.CANCELLED === view()} keyed><CancelConfirmationModal email={'aa'} expireDate={'bb'}/></Match>
      <Match when={View.PAUSE === view()} keyed><PauseModal pauseDate={'Thursday December 15, 2022.'} onDecision={onDecisionMade}/></Match>
    </Switch>
  </>
}
export default Setup;
