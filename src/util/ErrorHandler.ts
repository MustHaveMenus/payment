import {Alert} from "../index";
import {ResponseError} from "../generated/client";

export async function handleServerError(err: any) {
  const msg = await getErrorMessage(err);

  Alert.showError({text: msg, duration: 3});
  console.error(err);
}

export async function getErrorMessage(err: any) {
  let msg;

  try {
    const typedErr = err as ResponseError;
    msg = (await typedErr.response.json()).message;
  } catch (e) {
    console.error(e);
  }

  msg = msg || "We failed to complete your last action. Please try again after a few seconds or contact us.";
  return msg;
}
