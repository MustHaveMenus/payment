import {View} from "../type/types";
import OverviewModal from "./OverviewModal";
import {createEffect, createSignal, Match, onCleanup, onMount, Show, Switch} from "solid-js";
import PaymentModal from "./PaymentModal";
import ConfirmationModal from "./ConfirmationModal";
import TeamModal from "./TeamModal";
import LocationModal from "./LocationModal";
import {Portal} from "solid-js/web";
import {mobileState} from "../state/state";

export interface SetupProps {
  view?: View;
  open?: boolean
}

const Setup = (props: SetupProps) => {
  const [opened, setOpened] = createSignal(props.open ?? true);
  const [currentView, setCurrentView] = createSignal(props.view ?? View.OVERVIEW);
  const {setMobile} = mobileState;

  const detectMobile = () => {
    const elem = document.getElementById('mob-detect');
    if (!elem) return;
    setMobile(window.getComputedStyle(elem).display === 'block');
  };

  createEffect(() => {
    const event = 'resize';
    window.addEventListener(event, detectMobile);
    onCleanup(() => window.removeEventListener(event, detectMobile));
  });

  onMount(detectMobile);

  function onNext() {
    if (currentView() === View.PAYMENT) {
      setCurrentView(View.CONFIRMATION)
      return;
    }
    setCurrentView(View.PAYMENT);
  }

  function onBack() {
    setCurrentView(View.OVERVIEW);
  }

  function onModalClose() {
    setOpened(false);
  }

  return <Show when={opened()} keyed>
    <Portal>
      <div id={'mob-detect'}/>

      <Switch>
        <Match when={View.OVERVIEW === currentView()} keyed><OverviewModal onNext={onNext} onClose={onModalClose}/></Match>
        <Match when={View.PAYMENT === currentView()} keyed><PaymentModal onNext={onNext} onBack={onBack} onClose={onModalClose}/></Match>
        <Match when={View.CONFIRMATION === currentView()} keyed><ConfirmationModal onNext={onNext} onClose={onModalClose}/></Match>
        <Match when={View.TEAM === currentView()} keyed><TeamModal onNext={onNext} onClose={onModalClose}/></Match>
        <Match when={View.LOCATION === currentView()} keyed><LocationModal onNext={onNext} onClose={onModalClose}/></Match>
      </Switch>
    </Portal>
  </Show>
}
export default Setup;
