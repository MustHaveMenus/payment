export enum View {
  OVERVIEW = 'overview',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
  TEAM = 'team',
  LOCATION = 'location',
}

export interface Option {
  value: string;
  label: string;
}

export interface User extends Option {
  email: string;
  locations: Location[]
}

export interface Location extends Option {
  name: string;
}

