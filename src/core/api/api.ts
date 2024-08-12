"use server";

import { cookies } from "next/headers";

function baseUrl(): string {
  return process.env.BASE_URL ?? "";
}

enum Method {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const header = async (): Promise<HeadersInit | undefined> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return {
    // Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

const fetchData = async (
  path: string,
  body: Record<string, any>,
  method: Method,
): Promise<any> => {
  const base = `${baseUrl()}${path}`;

  return fetch(base, {
    method: method,
    headers: await header(),
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.status == 200 || res.status == 201) {
        // toast.done(date.getTime().toString());
        // toast.success("Logged in successfully!");

        return res.json();
      } else if (res.status == 400) {
        // toast.done(date.getTime().toString());
        // toast.error("Invalid username or password");

        return null;
      } else {
        // toast.done(date.getTime().toString());
        // toast.error("An error occurred");

        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error,
      );
    });
};

export const post = async (
  path: string,
  body: Record<string, any>,
): Promise<any> => {
  return await fetchData(path, body, Method.POST);
};
