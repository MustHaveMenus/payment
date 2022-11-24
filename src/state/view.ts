import {createRoot, createSignal} from "solid-js";
import {View} from "../type/types";

const viewState = createRoot(() => {
  const [view, setView] = createSignal(View.OVERVIEW);
  return {view, setView};
});

export default viewState;
