import {
  deleteFetchData,
  getFetchData,
  patchFetchData,
  postFetchData,
  postFetchLogin,
  putFetchData,
} from "@/src/core/api/api";
import {
  callToastDone,
  callToastError,
  callToastLoading,
  callToastSuccess,
} from "@/src/components/toast/callToast";

export const post = async (path: string, body: Record<string, any>) => {
  const date = new Date();

  // callToastLoading(date.getTime().toString());
  const resp = await postFetchData(path, body);

  // console.log('Response BaseApi', resp);

  // callToastDone(resp.message);

  if (resp.data === null) {
    callToastError(resp.message);

    return null;
  }
  callToastSuccess(resp.message);

  return resp.data;
};
export const postLogin = async (path: string, body: Record<string, any>) => {
  const date = new Date();

  // callToastLoading(date.getTime().toString());
  const resp = await postFetchLogin(path, body);


  callToastDone(resp.message);

  if (resp.data === null) {
    callToastError(resp.message);

    return null;
  }
  callToastSuccess(resp.message);

  return resp.data;
};

export const get = async (path: string) => {
  const date = new Date();

  // callToastLoading(date.getTime().toString());
  const resp = await getFetchData(path, {});

  // console.log("response", resp);
  if (resp.data === null) {
    callToastError(resp.message);

    return null;
  }
  // callToastSuccess(resp.data.message);

  return resp;
};

export const patch = async (path: string, body: Record<string, any>) => {
  const date = new Date();

  callToastLoading(date.getTime().toString());
  const resp = await patchFetchData(path, body);

  callToastDone(date.getTime().toString());

  if (resp.data === null) {
    callToastError(resp.message);

    return null;
  }
  callToastSuccess(resp.message);

  return resp.data;
};

export const put = async (path: string, body: Record<string, any>) => {
  const date = new Date();

  callToastLoading(date.getTime().toString());
  const resp = await putFetchData(path, body);

  callToastDone(date.getTime().toString());

  if (resp.data === null) {
    callToastError(resp.message);

    return null;
  }
  callToastSuccess(resp.message);

  return resp.data;
};

export const deleted = async (path: string, body: Record<string, any>) => {
  const date = new Date();

  callToastLoading(date.getTime().toString());
  const resp = await deleteFetchData(path, body);

  callToastDone(date.getTime().toString());

  if (resp.data === null) {
    callToastError(resp.message);

    return null;
  }
  callToastSuccess(resp.message);

  return resp.data;
};
