import {LocationDto} from "../generated/client";

export enum View {
  OVERVIEW = 'overview',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
  TEAM = 'team',
  LOCATION = 'location',
}

export interface Option {
  id?: string;
  name?: string;
}

export interface User extends Option {
  email: string;
  locations: LocationDto[]
}
