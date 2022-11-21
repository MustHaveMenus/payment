import {View} from "../type/types";
import OverviewModal from "./OverviewModal";
import {createSignal, Show} from "solid-js";
import PaymentModal from "./PaymentModal";

export interface SetupProps {
  view?: View;
  open?: boolean
}

const Setup = ({view, open}: SetupProps) => {
  const [opened, setOpened] = createSignal(open ?? true);
  const [currentView, setCurrentView] = createSignal(view ?? View.OVERVIEW);

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
    {View.OVERVIEW === currentView() && <OverviewModal onNext={onNext} onClose={onModalClose}/>}
    {View.PAYMENT === currentView() && <PaymentModal onNext={onNext} onBack={onBack} onClose={onModalClose}/>}
  </Show>
}
export default Setup;
