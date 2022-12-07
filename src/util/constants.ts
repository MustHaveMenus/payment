import {LocationDto} from "../generated/client";
import {User} from "../type/types";

export const USERS = 'users';
export const LOCATIONS = 'locations';
export const EMAIL = 'email';

export const SUBSCRIPTION_NAME_MONTHLY = 'Pro Monthly';
export const SUBSCRIPTION_NAME_ANNUALY = 'Pro Annual';

export const DEFAULT_LOCATION = {
  country: 'United States of America',
  state: 'Alabama'
} as LocationDto;

export const DEFAULT_USER = {
  email: '',
  locations: []
} as User
