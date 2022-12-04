import {cancelFromPauseSteps, cancelSteps, Decision, DecisionParams, reactivateSteps, Steps, View, ViewType} from "../type/types";
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
import PauseConfirmationModal from "./PauseConfirmationModal";
import loadingState from "../state/loading";
import {handleServerError} from "../util/ErrorHandler";
import {Alert} from "../index";

export interface SetupProps {
  type: ViewType;
  memberId: string;
  onSuccess?: () => void;
}

export interface PrivateSetupProps extends SetupProps {
  onClose: () => void;
}

const Setup = (props: PrivateSetupProps) => {
  const [steps, setSteps] = createSignal([] as View[]);
  const [email, setEmail] = createSignal('');
  const [expireDate, setExpireDate] = createSignal(new Date());
  const [nextPlanBillDate, setNextPlanBillDate] = createSignal(new Date());
  const {view, setView} = viewState;
  const {setMobile} = mobileState;
  const {opened, openModal, closeModal} = openState;
  const {memberId, setMemberId} = memberState;
  const {addLocations} = locationsState;
  const {setLoading} = loadingState;
  const [locationsServer] = createResource(memberId, AccountsApi.getLocations);
  const [subscription] = createResource(memberId, AccountsApi.getSubscription);

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
  });

  createEffect(() => {
    try {
      setLoading(true);
      const resp = subscription();
      if (!resp) return;
      setNextPlanBillDate(resp.planEndDate || new Date());
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  });

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
  });

  createEffect(async () => {
    if (props.type === ViewType.REACTIVATE) {
      try {
        setLoading(true);
        await AccountsApi.reactivateSubscription(memberId());
        Alert.show({text: 'Subscription successfully reactivated'});
        setLoading(false);
        props.onSuccess?.();
        closeModal();
        props.onClose();
      } catch (e: any) {
        setLoading(false);
        await handleServerError(e);
      }
    }
  });

  createEffect(async () => {
    if (props.type === ViewType.RESUME) {
      try {
        setLoading(true);
        await AccountsApi.resumeSubscription(memberId());
        Alert.show({text: 'Subscription successfully resumed'});
        setLoading(false);
        props.onSuccess?.();
        closeModal();
        props.onClose();
      } catch (e: any) {
        setLoading(false);
        await handleServerError(e);
      }
    }
  });

  async function onPause(period: number) {
    try {
      setLoading(true);
      const resp = await AccountsApi.pauseSubscription(memberId(), period);
      setEmail(resp.email || '');
      setExpireDate(resp.planEndDate || new Date());
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      await handleServerError(e);
    }
  }

  async function onCancel() {
    try {
      setLoading(true);
      const resp = await AccountsApi.cancelSubscription(memberId());
      setEmail(resp.email || '');
      setExpireDate(resp.planEndDate || new Date());
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      await handleServerError(e);
    }
  }

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

  createEffect(() => {
    if (view() === View.CONFIRM_PAUSE) {
      setSteps(Steps[props.type]);
    }
  })

  async function onDecisionMade(dec: Decision, params?: DecisionParams) {
    switch (dec) {
      case Decision.CANCEL: {
        let st = cancelSteps;
        if (props.type === ViewType.PAUSE) {
          st = cancelFromPauseSteps;
        }

        setSteps(st);
        setView(st[1]);
        break;
      }
      case Decision.REACTIVATE: {
        setSteps(reactivateSteps);
        setView(reactivateSteps[1]);
        break;
      }
      case Decision.CONFIRM_CANCEL: {
        await onCancel();
        onNext();
        break;
      }
      case Decision.BACK_TO_ACCOUNT: {
        props.onClose();
        break;

      }
      case Decision.CONFIRM_PAUSE: {
        await onPause(params?.period || 0);
        onNext();
        break;
      }
    }
  }

  return <>
    <div id={'mob-detect'}/>

    <Switch>
      <Match when={View.OVERVIEW === view()} keyed><OverviewModal onNext={onNext}/></Match>
      <Match when={View.OVERVIEW_REACTIVATE === view()} keyed><OverviewReactivateModal onDecision={onDecisionMade}/></Match>
      <Match when={View.LOCATION === view()} keyed><LocationModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.ADD_LOCATION === view()} keyed><LocationModal onNext={onNext} secondary disallowSkip/></Match>
      <Match when={View.ADD_TEAM === view()} keyed><TeamModal onBack={onBack} onNext={onNext} secondary/></Match>
      <Match when={View.TEAM === view()} keyed><TeamModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.PAYMENT === view()} keyed><PaymentModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.PAYMENT_FROM_FREE === view()} keyed><PaymentModal onBack={onBack} onNext={onNext} fromFree/></Match>
      <Match when={View.PAYMENT_REACTIVATE === view()} keyed><PaymentReactivateModal onBack={onBack} onNext={onNext}/></Match>
      <Match when={View.CONFIRM_CANCEL === view()} keyed><ConfirmCancelModal onDecision={onDecisionMade} onBack={props.type === ViewType.CANCEL ? undefined : onBack} /></Match>
      <Match when={View.CONFIRM_PAUSE === view()} keyed><PauseModal pauseDate={nextPlanBillDate()} onDecision={onDecisionMade}/></Match>

      <Match when={View.CONFIRMATION === view()} keyed><ConfirmationModal onSuccess={props.onSuccess}/></Match>
      <Match when={View.CANCELLED === view()} keyed><CancelConfirmationModal email={email()} expireDate={expireDate()} onSuccess={props.onSuccess}/></Match>
      <Match when={View.PAUSED === view()} keyed><PauseConfirmationModal email={email()} pauseDate={nextPlanBillDate()} resumeDate={nextPlanBillDate()} onSuccess={props.onSuccess}/></Match>
    </Switch>
  </>
}
export default Setup;
