import {View} from "../type/types";
import OverviewModal from "./OverviewModal";
import {createEffect, createSignal, onCleanup, onMount, Show} from "solid-js";
import PaymentModal from "./PaymentModal";

export interface SetupProps {
  view?: View;
  open?: boolean
}

const Setup = (props: SetupProps) => {
  const [opened, setOpened] = createSignal(props.open ?? true);
  const [currentView, setCurrentView] = createSignal(props.view ?? View.OVERVIEW);
  const [mobile, setMobile] = createSignal(false);

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
    setCurrentView(View.PAYMENT);
  }

  function onBack() {
    setCurrentView(View.OVERVIEW);
  }

  function onModalClose() {
    setOpened(false);
  }

  return <Show when={opened()} keyed>
    <div id={'mob-detect'}/>

    {View.OVERVIEW === currentView() && <OverviewModal onNext={onNext} onClose={onModalClose} mobile={mobile()}/>}
    {View.PAYMENT === currentView() && <PaymentModal onNext={onNext} onBack={onBack} onClose={onModalClose} mobile={mobile()}/>}
  </Show>
}
export default Setup;
