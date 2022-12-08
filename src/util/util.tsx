import {Countries, States} from "./countries";
import {Option, PaymentInfo, PaymentTypeEnum, User, ViewType} from "../type/types";
import {LocationDto, SubStatusDtoPlanCycleEnum} from "../generated/client";

export function formatCreditCard(value: string) {
  return value
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function formatCreditCardExpireDate(event: KeyboardEvent) {
  if (!event.target) return '';
  const value = (event.target as HTMLInputElement)?.value ?? '';

  const code = event.keyCode;
  const allowedKeys = [8];
  if (allowedKeys.indexOf(code) !== -1) {
    return value;
  }

  return value.replace(
    /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
  ).replace(
    /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
  ).replace(
    /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
  ).replace(
    /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
  ).replace(
    /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
  ).replace(
    /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
  ).replace(
    /\/\//g, '/' // Prevent entering more than 1 `/`
  );
}

export function removeIndex<T>(array: readonly T[], index: number): T[] {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export function replaceAtIndex<T>(array: readonly T[], index: number, value: T): T[] {
  return [...array.slice(0, index), value, ...array.slice(index + 1)];
}

export const countryValues = Countries.map(it => {
  return {
    id: it,
    name: it
  }
});

export const stateValues = Object.keys(States).map(it => {
  return {
    id: it,
    name: it
  }
});

export const pauseValues = [
  {
    id: '1',
    name: '1 month'
  },
  {
    id: '3',
    name: '3 months'
  }
] as Option[];

export const isNotEmpty = (v: string | undefined | null) => {
  return !!(v && v.length);
}
export const isNotEmptyNumber = (v: number | undefined | null) => {
  return !!v;
}

export const isValidPaymentInfo = (info: PaymentInfo) => {
  return isNotEmpty(info.country) &&
    isNotEmpty(info.number) &&
    isNotEmpty(info.cvc) &&
    isNotEmpty(info.zip) &&
    isNotEmptyNumber(info.year) &&
    isNotEmptyNumber(info.month);
}

export const isValidLocation = (loc: LocationDto) => {
  return isNotEmpty(loc.name) &&
    isNotEmpty(loc.address) &&
    isNotEmpty(loc.city) &&
    isNotEmpty(loc.state) &&
    isNotEmpty(loc.country) &&
    isNotEmpty(loc.zip)

}

export const isValidUser = (u: User) => {
  return isNotEmpty(u.email) && isEmail(u.email);
}

export const getCycle = (type: PaymentTypeEnum) => {
  switch (type) {
    case PaymentTypeEnum.Annually:
      return SubStatusDtoPlanCycleEnum.Yearly;
    case PaymentTypeEnum.Monthly:
      return SubStatusDtoPlanCycleEnum.Monthly;
    case PaymentTypeEnum.None:
      return SubStatusDtoPlanCycleEnum.No;
    default:
      return SubStatusDtoPlanCycleEnum.No
  }
}

export const getPaymentTypeCycle = (e: SubStatusDtoPlanCycleEnum) => {
  switch (e) {
    case "Monthly":
      return PaymentTypeEnum.Monthly;
    case "Yearly":
      return PaymentTypeEnum.Annually;
    default:
      return PaymentTypeEnum.None;
  }
}

export const isEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isAddonFlow = (type: ViewType) => {
  return type === ViewType.ADD_USER_ADDON || type === ViewType.ADD_LOCATION_ADDON;
}

export const isReactivateFlow = (type: ViewType) => {
  return type === ViewType.REACTIVATE_FROM_CANCELLED || type === ViewType.REACTIVATE_FROM_PAUSED || type === ViewType.REACTIVATE_FROM_DECLINED;
}

export const isNumeric = (str: string) => {
  try {
    return !isNaN(Number(str)) && !isNaN(parseFloat(str));
  } catch (e) {
    return false;
  }
}

export const getDaysUntil = (date: Date) => {
  const now = new Date();
  return parseInt(((date.getTime() - now.getTime()) / (1000 * 3600 * 24)) + '');
}
