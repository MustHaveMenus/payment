import {
  AccountsResourceApi, AddOnDtoTypeEnum,
  LightCardDto,
  LocationDto,
  MemberDto,
  PaymentDetailsDto,
  SubStatusDto,
  UpdateCardDto,
  UpgradeSubscriptionDto, UserDetailsDto,
} from "../generated/client";
import {apiConfig, ops} from "./config";

const api = new AccountsResourceApi(apiConfig);

const AccountsApi = {
  getAccount(memberId: string): Promise<MemberDto> {
    if (!memberId) return Promise.reject();
    return api.getAccount({memberId}, ops());
  },
  updateAccountPaymentDetailsCard(memberId: string, dto: UpdateCardDto): Promise<LightCardDto> {
    return api.updateAccountPaymentDetailsCard({memberId, updateCardDto: dto}, ops());
  },
  getPaymentDetails(memberId: string): Promise<PaymentDetailsDto> {
    if (!memberId) return Promise.reject();
    return api.getAccountPaymentDetails({memberId}, ops());
  },
  getSubscription(memberId: string): Promise<SubStatusDto> {
    if (!memberId) return Promise.resolve({});
    return api.getSubscription({memberId}, ops());
  },
  getLocations(memberId: string): Promise<LocationDto[]> {
    if (!memberId) return Promise.resolve([]);
    return api.getUserLocations({memberId}, ops());
  },
  getAllUsersDetails(memberId: string): Promise<UserDetailsDto> {
    return api.getAllUsersDetails({memberId}, ops());
  },
  upgradeSubscriptionPlan(memberId: string, upgradeSubscriptionDto: UpgradeSubscriptionDto): Promise<SubStatusDto> {
    if (!memberId || !upgradeSubscriptionDto) return Promise.reject();
    return api.upgradeSubscriptionPlan({memberId, upgradeSubscriptionDto}, ops());
  },
  cancelSubscription(memberId: string): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.cancelSubscription({memberId}, ops());
  },
  reactivateSubscription(memberId: string, dto: UpgradeSubscriptionDto): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.reactivateSubscription({memberId, upgradeSubscriptionDto: dto}, ops());
  },
  recreateSubscription(memberId: string, dto: UpgradeSubscriptionDto): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.recreateSubscriptionPlan({memberId, upgradeSubscriptionDto: dto}, ops());
  },
  pauseSubscription(memberId: string, period: number): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.pauseSubscription({memberId, body: period}, ops());
  },
  resumeSubscription(memberId: string, dto: UpgradeSubscriptionDto): Promise<SubStatusDto> {
    if (!memberId) return Promise.reject();
    return api.resumeSubscription({memberId, upgradeSubscriptionDto: dto}, ops());
  },
  addAddon(memberId: string, quantity: number, addonType: AddOnDtoTypeEnum) {
    if (!memberId) return Promise.reject();
    return api.addSubscriptionAddon({memberId, preview: false, quantity, body: addonType}, ops());
  }
};

export default AccountsApi;
