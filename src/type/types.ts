export enum View {
  OVERVIEW = 'overview',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation',
  TEAM = 'team',
  LOCATION = 'location',
}

export interface User {
  email: string;
  locations: string[]
}

