import {env} from "../env/env";
import Storage from "../util/Storage";
import {Configuration} from "../generated/client";

export const ops = (loginToken: string = "") => {
  if (!Storage.getToken() && !loginToken) return {};

  return {
    headers: {
      Authorization: "Bearer " + (loginToken || Storage.getToken()),
    },
  };
};

export const apiConfig = new Configuration({basePath: env.apiPath});
