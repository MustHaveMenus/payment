import {AccountsResourceApi, LocationDto, MemberDto, SubStatusDto, SubStatusDtoPlanCycleEnum, UpgradeSubscriptionDto,} from "../generated/client";
import {apiConfig, ops} from "./config";

const api = new AccountsResourceApi(apiConfig);

const AccountsApi = {
  getAccount(memberId: string): Promise<MemberDto> {
    if (!memberId) return Promise.reject();
    return api.getAccount({memberId}, ops());
  },
  getSubscription(memberId: string): Promise<SubStatusDto> {
    if (!memberId) return Promise.resolve({});
    return api.getSubscription({memberId}, ops());
  },
  getLocations(memberId: string): Promise<LocationDto[]> {
    if (!memberId) return Promise.resolve([]);
    return api.getUserLocations({memberId}, ops());
  },
  upgradeSubscriptionPlan(memberId: string, upgradeSubscriptionDto: UpgradeSubscriptionDto): Promise<SubStatusDto> {
    if (!memberId || !upgradeSubscriptionDto) return Promise.reject();
    return api.upgradeSubscriptionPlan({memberId, upgradeSubscriptionDto}, ops());
  },
  cancelSubscription(memberId: string): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.cancelSubscription({memberId}, ops());
  },
  reactivateSubscription(memberId: string): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.reactivateSubscription({memberId}, ops());
  },
  recreateSubscription(memberId: string, dto: UpgradeSubscriptionDto): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.recreateSubscriptionPlan({memberId, upgradeSubscriptionDto: dto});
  },
  pauseSubscription(memberId: string, period: number): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.pauseSubscription({memberId, body: period}, ops());
  },
  resumeSubscription(memberId: string): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.resumeSubscription({memberId}, ops());
  },
};

export default AccountsApi;
