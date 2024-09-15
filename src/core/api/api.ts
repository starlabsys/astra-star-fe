"use server";

import { cookies } from "next/headers";

import {
  ErrorData,
  ReturnResult,
} from "@/src/core/api/interface/InterfaceResponseResult";

function baseUrl(): string {
  return process.env.BASE_URL ?? "";
}

enum Method {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
}

const cookieStore = cookies();

const header = async (): Promise<HeadersInit | undefined> => {
  const token = await cookieStore.get("token");

  return {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
};

// const fetchData = async (
//   path: string,
//   body: Record<string, any>,
//   method: Method,
// ): Promise<any> => {
//   const base = `${baseUrl()}${path}`;

//   const headers = await header();

//   console.debug("fetching data from", base);
//   console.debug("headers", headers);
//   console.debug("method", method);
//   console.debug("body", body);
//   console.debug("====================================");

//   return fetch(base, {
//     method: method,
//     headers: headers,
//     body: JSON.stringify(body),
//   })
//     .then(async (res) => {
//       console.debug("response status", res.status);
//       const [respJson] = await Promise.all([res.json()]);

//       if (res.status == 200 || res.status == 201) {
//         console.debug("response body", respJson);

//         if (respJson.token !== null) {
//           cookieStore.set("token", respJson.token, {
//             expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
//           });
//         }

//         return {
//           message: respJson.message ?? "Success",
//           statusCode: res.status,
//           data: respJson,
//         };
//       } else if (res.status == 400) {
//         // console.log("ERROR 400")
//         throw new ErrorData(respJson.message, res.status);
//       } else {
//         throw new ErrorData("Network response was not ok", 500);
//       }
//     })
//     .catch((error: ErrorData) => {
//       console.debug("error", error.message);

//       return {
//         message: error.message,
//         statusCode: error.status,
//         data: null,
//       };
//     });
// };

const fetchData = async (
  path: string,
  body: Record<string, any>,
  method: Method,
): Promise<any> => {
  const base = `${baseUrl()}${path}`;
  const headers = await header();

  console.debug("fetching data from", base);
  console.debug("headers", headers);
  console.debug("method", method);
  console.debug("body", body);
  console.debug("====================================");

  const fetchOptions: RequestInit = {
    method: method,
    headers: headers,
  };

  // Include body only if the method is not GET or HEAD
  if (method !== Method.GET && method !== Method.HEAD) {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(base, fetchOptions)
    .then(async (res) => {
      console.debug("response status", res.status);
      const [respJson] = await Promise.all([res.json()]);

      if (res.status === 200 || res.status === 201) {
        console.debug("response body", respJson);

        // if (respJson.token !== null) {
        //   cookieStore.set("token", respJson.token, {
        //     expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        //   });
        // }

        return {
          message: respJson.message ?? "Success",
          statusCode: res.status,
          data: respJson,
        };
      } else if (res.status === 400) {
        throw new ErrorData(respJson.message, res.status);
      } else if (res.status === 404) {
        throw new ErrorData(respJson.message, 404);
      } else {
        throw new ErrorData("Network response was not ok", 500);
      }
    })
    .catch((error: ErrorData) => {
      console.debug("error", error.message);

      return {
        message: error.message,
        statusCode: error.status,
        data: null,
      };
    });
};

export const postFetchData = async (
  path: string,
  body: Record<string, any>,
): Promise<ReturnResult> => {
  const resp = await fetchData(path, body, Method.POST);

  return {
    data: resp.data,
    message: resp.message,
    statusCode: resp.statusCode,
  };
};

export const getFetchData = async (
  path: string,
  body: Record<string, any>,
): Promise<ReturnResult> => {
  const resp = await fetchData(path, body, Method.GET);

  return {
    data: resp.data.result,
    message: resp.message,
    statusCode: resp.statusCode,
    // data: "data",
    // message: "message",
    // statusCode: 201,
  };
};
export const getFetchDataOnly = async (
  path: string,
  body: Record<string, any>,
): Promise<any> => {
  const resp = await fetchData(path, body, Method.GET);

  return {
    data: resp,
  };
};
export const putFetchDataOnly = async (
  path: string,
  body: Record<string, any>,
): Promise<any> => {
  const resp = await fetchData(path, body, Method.PUT);

  return {
    data: resp,
  };
};

export const putFetchData = async (
  path: string,
  body: Record<string, any>,
): Promise<ReturnResult> => {
  const resp = await fetchData(path, body, Method.PUT);

  return {
    data: resp.data,
    message: resp.message,
    statusCode: resp.statusCode,
  };
};

export const patchFetchData = async (
  path: string,
  body: Record<string, any>,
): Promise<ReturnResult> => {
  const resp = await fetchData(path, body, Method.PATCH);

  return {
    data: resp.data,
    message: resp.message,
    statusCode: resp.statusCode,
  };
};

export const deleteFetchData = async (
  path: string,
  body: Record<string, any>,
): Promise<ReturnResult> => {
  const resp = await fetchData(path, body, Method.DELETE);

  return {
    data: resp.data,
    message: resp.message,
    statusCode: resp.statusCode,
  };
};

export const postFetchLogin = async (
  path: string,
  body: Record<string, any>,
): Promise<ReturnResult> => {
  const resp = await fetchData(path, body, Method.POST);

  if (resp.data !== null) {
    // console.log("response", resp.data);
    if (resp.data.result !== null) {
      const token = resp.data.result.token;

      // console.log("Token Set to Cookie", token);
      cookieStore.set("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
    }
  }

  return {
    data: resp.data,
    message: resp.message,
    statusCode: resp.statusCode,
  };
};
