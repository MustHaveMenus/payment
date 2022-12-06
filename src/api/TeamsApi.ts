import {LocationDto, TeamsResourceApi,} from "../generated/client";
import {apiConfig, ops} from "./config";

const api = new TeamsResourceApi(apiConfig);

const TeamsApi = {
  validateLocation(teamId: string, locations: LocationDto[]): Promise<void> {
    return api.validateTeamLocation({teamId, locationDto: locations}, ops());
  },
};

export default TeamsApi;
