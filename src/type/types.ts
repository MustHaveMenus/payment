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
  PAUSE = 'PAUSE',
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
  FREE_TO_PRO_WITH_ADDONS = 'FREE_TO_PRO_WITH_ADDONS',
  ADD_LOCATION_ADDON = 'ADD_LOCATION_ADDON',
  ADD_USER_ADDON = 'ADD_USER_ADDON',
  REACTIVATE_FROM_PAUSED = 'REACTIVATE_FROM_PAUSED',
  REACTIVATE_FROM_CANCELLED = 'REACTIVATE_FROM_CANCELLED',
  REACTIVATE_FROM_DECLINED = 'REACTIVATE_FROM_DECLINED',
  PAUSE = 'PAUSE',
}

export const Steps = {
  [ViewType.FREE_TO_PRO]: [View.OVERVIEW, View.PAYMENT, View.CONFIRMATION],
  [ViewType.FREE_TO_PRO_WITH_ADDONS]: [View.OVERVIEW, View.LOCATION, View.TEAM, View.PAYMENT, View.CONFIRMATION],
  [ViewType.ADD_LOCATION_ADDON]: [View.LOCATION, View.TEAM, View.PAYMENT, View.CONFIRMATION],
  [ViewType.ADD_USER_ADDON]: [View.TEAM, View.LOCATION, View.PAYMENT, View.CONFIRMATION],
  [ViewType.REACTIVATE_FROM_PAUSED]: [View.OVERVIEW_REACTIVATE],
  [ViewType.REACTIVATE_FROM_CANCELLED]: [],
  [ViewType.REACTIVATE_FROM_DECLINED]: [],
  [ViewType.PAUSE]: [View.PAUSE],
}

export const reactivateSteps = [View.OVERVIEW_REACTIVATE, View.PAYMENT_REACTIVATE, View.CONFIRMATION]
export const cancelSteps = [View.OVERVIEW_REACTIVATE, View.CONFIRM_CANCEL, View.CANCELLED];

export enum Decision {
  REACTIVATE, CANCEL, CONFIRM_CANCEL, BACK_TO_ACCOUNT, CONFIRM_PAUSE
}
