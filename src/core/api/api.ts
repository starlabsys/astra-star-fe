"use server";

import { cookies } from "next/headers";

import {
  ErrorData,
  ReturnResult,
} from "@/src/core/api/interface/InterfaceResponseResult";

function baseUrl(): string {
  return "https://api-star.tengkuangonet.my.id/api";
}

enum Method {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
}

const header = async (): Promise<HeadersInit | undefined> => {
  const cookieStore = cookies();

  const token = cookieStore.get("token");

  return {
    Authorization: `Bearer ${token?.value}`,
    "Content-Type": "application/json",
  };
};

const fetchData = async (
  path: string,
  body: Record<string, any>,
  method: Method,
): Promise<any> => {
  const base = `${baseUrl()}${path}`;
  const headers = await header();

  console.debug("\n====================================");
  console.debug("fetching data from", base);
  console.debug("headers", JSON.stringify(headers));
  console.debug("method", method);
  console.debug("body", JSON.stringify(body));
  console.debug("====================================\n");

  const fetchOptions: RequestInit = {
    method: method,
    headers: headers,
  };

  // Include body only if the method is not GET or HEAD
  if (method !== Method.GET && method !== Method.HEAD) {
    fetchOptions.body = JSON.stringify(body);
  }

  const timeout = 10000; // 10 seconds
  const controller = new AbortController();
  const { signal } = controller;

  const fetchPromise = fetch(base, { ...fetchOptions, signal });

  const timeoutPromise = new Promise<never>((_, reject) =>
    setTimeout(() => {
      controller.abort(); // Membatalkan fetch jika timeout
      reject(new Error("Request timeout")); // Menolak promise dengan error
    }, timeout),
  );

  return Promise.race([fetchPromise, timeoutPromise])
    .then(async (res: Response) => {
      // Menetapkan tipe Response di sini
      console.debug("\n====================================");
      console.debug("response data from", base);
      console.debug("response status Data", res.status);

      const contentType = res.headers.get("Content-Type");
      const textResponse = await res.text(); // Mengambil respon sebagai teks

      // Periksa apakah konten adalah JSON
      if (contentType && contentType.includes("application/json")) {
        const respJson = JSON.parse(textResponse); // Mengurai JSON jika konten adalah JSON

        if (res.status === 200 || res.status === 201) {
          console.debug("response body", JSON.stringify(respJson));

          return {
            message: respJson.message ?? "Success",
            statusCode: res.status,
            data: respJson,
          };
        } else if (res.status === 400) {
          throw new ErrorData(respJson.message, res.status);
        } else if (res.status === 401) {
          cookies().delete("token");
          throw new ErrorData(respJson.message, res.status);
        } else if (res.status === 404) {
          throw new ErrorData(respJson.message, 404);
        } else if (res.status === 504) {
          throw new ErrorData(
            "Waktu Menunggu Terlalu lama, silahkan di cek di menu history",
            504,
          );
        } else {
          throw new ErrorData("Network response was not ok", 500);
        }
      } else {
        // Jika konten bukan JSON, throw error
        throw new Error(`Unexpected response: ${textResponse}`);
      }
    })
    .catch((error: ErrorData) => {
      console.debug("error data catch", error.message);

      return {
        message: error.message,
        statusCode: error.status || 500,
        data: null,
      };
    })
    .finally(() => {
      console.debug("====================================\n");
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
  const cookieStore = cookies();

  const resp = await fetchData(path, body, Method.POST);

  if (resp.data !== null) {
    // console.log("response", resp.data);
    if (resp.data.result !== null) {
      const token = resp.data.result.token;
      const statusToken = resp.data.result.user.statusToken;

      // console.log("Token Set to Cookie", token);
      cookieStore.set("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      cookieStore.set("status_token", statusToken, {
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
