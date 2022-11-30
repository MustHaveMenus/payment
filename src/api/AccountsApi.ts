import {AccountsResourceApi, LocationDto, SubStatusDto, SubStatusDtoPlanCycleEnum, UpgradeSubscriptionDto,} from "../generated/client";
import {apiConfig, ops} from "./config";

const api = new AccountsResourceApi(apiConfig);

const AccountsApi = {
  getLocations(memberId: string): Promise<LocationDto[]> {
    if (!memberId) return Promise.reject();
    return api.getUserLocations({memberId}, ops());
  },
  changeSubscriptionPlan(memberId: string, cycle: SubStatusDtoPlanCycleEnum, preview: boolean): Promise<SubStatusDto> {
    if (!memberId || !cycle) return Promise.reject();
    return api.changeSubscriptionPlan({memberId, preview, body: cycle}, ops());
  },
  upgradeSubscriptionPlan(memberId: string, upgradeSubscriptionDto: UpgradeSubscriptionDto): Promise<SubStatusDto> {
    if (!memberId || !upgradeSubscriptionDto) return Promise.reject();
    return api.upgradeSubscriptionPlan({memberId, upgradeSubscriptionDto}, ops());
  }
};

export default AccountsApi;
