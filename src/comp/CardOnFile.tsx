import styles from './CardOnFile.module.scss';
import CardIcon from "./svg/CardIcon";
import {LightCardDto} from "../generated/client";
import {createEffect, createSignal} from "solid-js";

interface CardOnFileProps {
  card: LightCardDto;
  hideCardEnding?: boolean;
}

const CardOnFile = (props: CardOnFileProps) => {
  const [cardExpirationDate, setCardExpirationDate] = createSignal('');

  createEffect(() => {
    if (!props.card || !props.card.exprMonth || !props.card.exprYear) return;
    const month = props.card.exprMonth < 10 ? `0${props.card.exprMonth}` : props.card.exprMonth;
    const year = props.card.exprYear % 100;
    setCardExpirationDate(`(exp ${month}/${year})`);
  })

  return <div class={styles.cardInfo}>
    <div><CardIcon/></div>
    <div><b>Card on file</b></div>
    <div>**** **** **** {props.hideCardEnding ? '****' : `${props.card.ending}`}</div>
    <div>{cardExpirationDate()}</div>
  </div>
}

export default CardOnFile;
