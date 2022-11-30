import Storage from "../util/Storage";
import {Configuration} from "../generated/client";
import {env} from "../env/env";

export const ops = (loginToken: string = "") => {
  if (!Storage.getToken() && !loginToken) return {};

  return {
    headers: {
      Authorization: "Bearer " + (loginToken || Storage.getToken()),
      'Content-Type': 'application/json'
    },
  };
};

const getApiPath = () => {
  const host = window.location.host;
  if (host === 'test.mhmfun.com') {
    return 'https://test.mhmfun.com/account-test';
  } else if (host === 'staging.mhmfun.com') {
    return 'https://www.musthavemenus.com/account-stage';
  } else if (host === 'www.musthavemenus.com') {
    return 'https://www.musthavemenus.com/account';
  }
  return env.apiPath;
}

export const apiConfig = new Configuration({basePath: getApiPath()});
