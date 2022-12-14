import {LocationDto} from "../generated/client";

export enum View {
  OVERVIEW = 'overview',
  OVERVIEW_REACTIVATE = 'overview-reactivate',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
  TEAM = 'team',
  LOCATION = 'location',

  //internal
  PAYMENT_REACTIVATE = 'PAYMENT_REACTIVATE',
  CONFIRM_CANCEL = 'CONFIRM_CANCEL',
  CANCELLED = 'CANCELLED',
  PAUSED = 'PAUSED',
  CONFIRM_PAUSE = 'CONFIRM_PAUSE',
}

export interface Option {
  id?: string;
  name?: string;
}

export interface User extends Option {
  email: string;
  locations: LocationDto[]
}

export enum ViewType {
  FREE_TO_PRO = 'FREE_TO_PRO',
  FREE_TO_PRO_WITH_LOCATION = 'FREE_TO_PRO_WITH_LOCATION',
  FREE_TO_PRO_WITH_USERS = 'FREE_TO_PRO_WITH_USERS',
  ADD_LOCATION_ADDON = 'ADD_LOCATION_ADDON',
  ADD_USER_ADDON = 'ADD_USER_ADDON',
  REACTIVATE_FROM_PAUSED = 'REACTIVATE_FROM_PAUSED',
  RESUME = 'RESUME',
  REACTIVATE = 'REACTIVATE',
  REACTIVATE_FROM_CANCELLED = 'REACTIVATE_FROM_CANCELLED',
  REACTIVATE_FROM_DECLINED = 'REACTIVATE_FROM_DECLINED',
  PAUSE = 'PAUSE',
  CANCEL = 'CANCEL',
}

export const Steps = {
  [ViewType.FREE_TO_PRO]: [View.OVERVIEW, View.PAYMENT, View.CONFIRMATION],
  [ViewType.FREE_TO_PRO_WITH_LOCATION]: [View.OVERVIEW, View.PAYMENT, View.CONFIRMATION],
  [ViewType.FREE_TO_PRO_WITH_USERS]: [View.OVERVIEW, View.PAYMENT, View.CONFIRMATION],
  [ViewType.ADD_LOCATION_ADDON]: [View.LOCATION, View.PAYMENT, View.CONFIRMATION],
  [ViewType.ADD_USER_ADDON]: [View.TEAM, View.PAYMENT, View.CONFIRMATION],
  [ViewType.REACTIVATE_FROM_PAUSED]: [View.OVERVIEW_REACTIVATE, View.PAYMENT, View.CONFIRMATION],
  [ViewType.REACTIVATE_FROM_CANCELLED]: [View.PAYMENT, View.CONFIRMATION],
  [ViewType.REACTIVATE_FROM_DECLINED]: [View.PAYMENT, View.CONFIRMATION],
  [ViewType.PAUSE]: [View.CONFIRM_PAUSE, View.PAUSED],
  [ViewType.CANCEL]: [View.CONFIRM_CANCEL, View.CANCELLED],
  [ViewType.RESUME]: [],
  [ViewType.REACTIVATE]: [],
}

export const reactivateSteps = [View.OVERVIEW_REACTIVATE, View.PAYMENT_REACTIVATE, View.CONFIRMATION]
export const cancelSteps = [View.OVERVIEW_REACTIVATE, View.CONFIRM_CANCEL, View.CANCELLED];
export const cancelFromPauseSteps = [View.CONFIRM_PAUSE, View.CONFIRM_CANCEL, View.CANCELLED];

export interface DecisionParams {
  period?: number;
}

export enum Decision {
  REACTIVATE, CANCEL, CONFIRM_CANCEL, BACK_TO_ACCOUNT, CONFIRM_PAUSE
}

export enum PaymentTypeEnum {
  None = 'n', Annually = 'a', Monthly = 'm'
}

export interface PaymentInfo {
  number: string;
  cvc: string;
  zip: string;
  country: string;
  month: number;
  year: number;
}
