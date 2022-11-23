import {createRoot, createSignal} from "solid-js";

const openState = createRoot(() => {
  const [opened, setOpened] = createSignal(true);
  const closeModal = () => setOpened(false);
  const openModal = () => setOpened(true);
  return {opened, closeModal, openModal};
});

export default openState;

