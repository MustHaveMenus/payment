import {AccountsResourceApi, LocationDto,} from "../generated/client";
import {apiConfig, ops} from "./config";

const api = new AccountsResourceApi(apiConfig);

const AccountsApi = {
  getLocations(memberId: string): Promise<LocationDto[]> {
    if (!memberId) return Promise.reject();
    return api.getUserLocations({memberId}, ops());
  }
};

export default AccountsApi;
