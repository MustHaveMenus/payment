import {InviteUserDto, UsersResourceApi,} from "../generated/client";
import {apiConfig, ops} from "./config";

const api = new UsersResourceApi(apiConfig);

const UsersApi = {
  validateTeamUsers(inviteUserDtos: InviteUserDto[]): Promise<void> {
    return api.validateTeamUsers({inviteUserDto: inviteUserDtos}, ops());
  },
  inviteUser(dtos: InviteUserDto[]): Promise<void> {
    return api.inviteUser({inviteUserDto: dtos}, ops());
  },
};

export default UsersApi;
