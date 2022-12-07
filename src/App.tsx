import {cancelFromPauseSteps, cancelSteps, Decision, DecisionParams, reactivateSteps, Steps, View, ViewType} from "./type/types";
import OverviewModal from "./modal/OverviewModal";
import {createEffect, createResource, createSignal, Match, onCleanup, onMount, Switch} from "solid-js";
import PaymentModal from "./modal/PaymentModal";
import ConfirmationModal from "./modal/ConfirmationModal";
import TeamModal from "./modal/TeamModal";
import LocationModal from "./modal/LocationModal";
import mobileState from "./state/mobile";
import openState from "./state/open";
import AccountsApi from "./api/AccountsApi";
import memberState from "./state/member";
import locationsState from "./state/location";
import viewState from "./state/view";
import OverviewReactivateModal from "./modal/OverviewReactivateModal";
import ConfirmCancelModal from "./modal/ConfirmCancelModal";
import CancelConfirmationModal from "./modal/CancelConfirmationModal";
import PaymentReactivateModal from "./modal/PaymentReactivateModal";
import PauseModal from "./modal/PauseModal";
import PauseConfirmationModal from "./modal/PauseConfirmationModal";
import loadingState from "./state/loading";
import {handleServerError} from "./util/ErrorHandler";
import {Alert} from "./index";
import {getCycle} from "./util/util";
import {InviteUserDto, SubStatusDto, UpgradeSubscriptionDto, UpgradeSubscriptionDtoCycleEnum} from "./generated/client";
import paymentInfoState from "./state/paymentInfo";
import paymentTypeState from "./state/paymentType";
import {LOCATIONS, USERS} from "./util/constants";
import teamState from "./state/team";
import {Countries} from "./util/countries";

export interface AppProps {
  type: ViewType;
  memberId: string;
  onSuccess?: () => void;
  closable?: boolean;
}

export interface PrivateSetupProps extends AppProps {
  onClose: () => void;
}

const App = (props: PrivateSetupProps) => {
  const [steps, setSteps] = createSignal([] as View[]);
  const [email, setEmail] = createSignal('');
  const [memberId, setMemberId] = createSignal('');
  const [expireDate, setExpireDate] = createSignal(new Date());
  const [nextPlanBillDate, setNextPlanBillDate] = createSignal(new Date());
  const [pauseEndDate, setPauseEndDate] = createSignal(new Date());
  const {view, setView} = viewState;
  const {setMobile} = mobileState;
  const {opened, openModal, closeModal} = openState;
  const {member, setMember} = memberState;
  const {addLocations, fullCleanLocations} = locationsState;
  const {setLoading} = loadingState;
  const [previewLoading, setPreviewLoading] = createSignal(false);
  const {paymentInfo} = paymentInfoState;
  const {paymentType} = paymentTypeState;
  const {team, cleanUsers} = teamState;
  const {locations} = locationsState;
  const [status, setStatus] = createSignal({} as SubStatusDto);
  const [locationsServer] = createResource(memberId, AccountsApi.getLocations);
  const [subscription] = createResource(memberId, AccountsApi.getSubscription);
  const [zip, setZip] = createSignal('');
  const [country, setCountry] = createSignal(Countries[0]);
  const [cardNumber, setCardNumber] = createSignal('');
  const [cardMonth, setCardMonth] = createSignal('');
  const [cardYear, setCardYear] = createSignal('');
  const [cvc, setCVC] = createSignal('');

  function clean() {
    cleanUsers();
    fullCleanLocations();
    setStatus({});
    setZip('');
    setMember({});
    setMemberId('');
  }

  createEffect(() => {
    if (member().id) {
      setMemberId(member().id!);
    }
  });

  createEffect(() => {
    const info = paymentInfo();
    if (!info || Object.keys(info).length === 0) return;

    setZip(info.zip);
    setCountry(info.country);
    setCardNumber(info.number);
    setCardMonth(`${info.month || ''}`);
    setCardYear(`${info.year || ''}`);
    setCVC(info.cvc);
  });

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
      if (props.type === ViewType.REACTIVATE_FROM_PAUSED) {
        setLoading(true);
      }
      const resp = subscription();
      if (!resp || !Object.keys(resp).length) return;
      setNextPlanBillDate(resp.planEndDate || new Date());
      setPauseEndDate(resp.pauseEndDate || new Date());
      if (props.type === ViewType.REACTIVATE_FROM_PAUSED) {
        setStatus(resp);
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  });

  const detectMobile = () => {
    const elem = document.getElementById('mob-detect');
    if (!elem) return;
    setMobile(window.getComputedStyle(elem).display === 'block');
  };

  onMount(async () => {
    clean();
    detectMobile();
    setMember(await AccountsApi.getAccount(props.memberId));
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
    if (!member() || !member().id) return;
    if (props.type === ViewType.RESUME) {
      try {
        setLoading(true);
        await AccountsApi.resumeSubscription(member().id!);
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

  const getPreviewUpgradeSubDto = () => {
    return {
      preview: true,
      cycle: getCycle(paymentType()),
      zip: zip(),
      country: country(),
      locations: locations[LOCATIONS].filter(it => it.id === it.name),
      users: team[USERS].map(it => {
        return {
          email: it.email,
          locations: it.locations.filter(it => it).map(it => it.name),
          ownerId: member().id
        }
      }) as InviteUserDto[]
    } as UpgradeSubscriptionDto;
  }

  const getUpgradeSubDto = () => {
    return {
      ...getPreviewUpgradeSubDto(),
      preview: false,
      card: {
        number: cardNumber(),
        month: cardMonth(),
        year: cardYear(),
        cvv: cvc()
      }
    }
  }

  async function previewInvoice() {
    if (!member() || !member().id) return;
    if (view() !== View.PAYMENT) return;
    const dto = getPreviewUpgradeSubDto();
    if (dto.cycle === UpgradeSubscriptionDtoCycleEnum.No && !dto.users?.length && !dto.locations?.length) return;
    if ((dto.zip?.length || 0) > 0 && (dto.zip?.length || 1) < 5) return;
    if ((props.type === ViewType.FREE_TO_PRO_WITH_USERS || props.type === ViewType.FREE_TO_PRO_WITH_LOCATION || props.type === ViewType.FREE_TO_PRO) && dto.cycle === UpgradeSubscriptionDtoCycleEnum.No) return;

    try {
      setPreviewLoading(true);
      setStatus(await AccountsApi.upgradeSubscriptionPlan(member().id!, dto));
      setPreviewLoading(false);
    } catch (e: any) {
      setPreviewLoading(false);
      await handleServerError(e);
    }
  }

  createEffect(previewInvoice);

  async function onSubscribe() {
    if (!member() || !member().id) return;
    try {
      const dto = getUpgradeSubDto();

      setLoading(true);

      if (props.type === ViewType.REACTIVATE_FROM_CANCELLED) {
        await AccountsApi.recreateSubscription(member().id!, dto);
      } else if (props.type === ViewType.REACTIVATE_FROM_PAUSED) {
        setStatus(await AccountsApi.reactivateSubscription(member().id!, dto));
      } else {
        await AccountsApi.upgradeSubscriptionPlan(member().id!, dto);
      }

      setLoading(false);
      onNext();
    } catch (e: any) {
      setLoading(false);
      await handleServerError(e);
    }
  }

  async function onPause(period: number) {
    if (!member() || !member().id) return;
    try {
      setLoading(true);
      const resp = await AccountsApi.pauseSubscription(member().id!, period);
      setEmail(resp.email || '');
      setExpireDate(resp.planEndDate || new Date());
      setPauseEndDate(resp.pauseEndDate || new Date());
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      await handleServerError(e);
    }
  }

  async function onCancel() {
    if (!member() || !member().id) return;
    try {
      setLoading(true);
      const resp = await AccountsApi.cancelSubscription(member().id!);
      setEmail(resp.email || '');
      setExpireDate(resp.planEndDate || new Date());
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      await handleServerError(e);
    }
  }

  function getCurrentViewIdx() {
    return steps().findIndex((it => it === view()));
  }

  function onNext() {
    const cb = () => {
      const currentIdx = getCurrentViewIdx();
      if (currentIdx < steps().length - 1) {
        setView(steps()[currentIdx + 1]);
      }
    };

    if (subscription.loading || locationsServer.loading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        cb();
      }, 2000);
    } else {
      cb();
    }
  }

  function onBack() {
    const currentIdx = getCurrentViewIdx();
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

  function getOnBack() {
    return getCurrentViewIdx() > 0 ? onBack : undefined;
  }

  function getOnNext() {
    return onNext;
  }

  return <>
    <div id={'mob-detect'}/>

    <Switch>
      <Match when={View.OVERVIEW === view()} keyed><OverviewModal onNext={getOnNext()}/></Match>
      <Match when={View.LOCATION === view()} keyed><LocationModal onBack={getOnBack()} onNext={getOnNext()} type={props.type}
                                                                  idx={getCurrentViewIdx()}/></Match>
      <Match when={View.TEAM === view()} keyed><TeamModal onBack={getOnBack()} onNext={getOnNext()} type={props.type}
                                                          idx={getCurrentViewIdx()}/></Match>
      <Match when={View.PAYMENT === view()} keyed><PaymentModal onBack={getOnBack()} onNext={getOnNext()} type={props.type} idx={getCurrentViewIdx()}
                                                                status={status()} previewLoading={previewLoading()}
                                                                onPay={onSubscribe}/></Match>

      <Match when={View.CONFIRM_CANCEL === view()} keyed><ConfirmCancelModal onDecision={onDecisionMade}
                                                                             onBack={props.type === ViewType.CANCEL ? undefined : onBack}/></Match>
      <Match when={View.CONFIRM_PAUSE === view()} keyed><PauseModal pauseDate={nextPlanBillDate()} onDecision={onDecisionMade}/></Match>

      <Match when={View.CONFIRMATION === view()} keyed><ConfirmationModal onSuccess={props.onSuccess} type={props.type} idx={getCurrentViewIdx()}
                                                                          status={status()} users={team[USERS].length}
                                                                          locations={locations[LOCATIONS].filter(it => it.id === it.name).length}/></Match>
      <Match when={View.CANCELLED === view()} keyed><CancelConfirmationModal email={email()} expireDate={expireDate()}
                                                                             onSuccess={props.onSuccess}/></Match>
      <Match when={View.PAUSED === view()} keyed><PauseConfirmationModal email={email()} pauseDate={nextPlanBillDate()}
                                                                         resumeDate={pauseEndDate()} onSuccess={props.onSuccess}/></Match>


      <Match when={View.OVERVIEW_REACTIVATE === view()} keyed><OverviewReactivateModal onDecision={onDecisionMade} status={status()}/></Match>
      <Match when={View.PAYMENT_REACTIVATE === view()} keyed><PaymentReactivateModal onPay={onSubscribe} onBack={getOnBack()} onNext={getOnNext()}
                                                                                     type={props.type} status={status()}
                                                                                     previewLoading={previewLoading()}/></Match>
    </Switch>
  </>
}
export default App;
