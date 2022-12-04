import {Countries, States} from "./countries";
import {Option, PaymentInfo, PaymentTypeEnum, User} from "../type/types";
import paymentType from "../comp/PaymentType";
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
    id: States[it],
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
  return type === PaymentTypeEnum.Monthly ? SubStatusDtoPlanCycleEnum.Monthly : SubStatusDtoPlanCycleEnum.Yearly;
}

export const isEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
