import { post } from "@/src/core/api/api";
import {
  callToastDone,
  callToastError,
  callToastLoading,
  callToastSuccess,
} from "@/src/components/toast/callToast";

export const loginLoading = async (path: string, body: Record<string, any>) => {
  const date = new Date();

  callToastLoading(date.getTime().toString());
  const resp = await post(path, body);

  callToastDone(date.getTime().toString());

  // console.log(resp);
  if (resp === null) {
    callToastError("Invalid username or password");

    return null;
  }
  callToastSuccess("Logged in successfully!");

  return resp;
};


export const postData = async (path: string, body: Record<string, any>) => {
  const resp = await post(path, body);


  console.log("response on postData", resp);
  console.log(resp);
  if (resp === null) {
    callToastError(resp.message);

    return null;
  }
  callToastSuccess(resp.message);

  return resp;
}
