import { deleteCookie, getCookie, setCookie } from "cookies-next";

const env = process.env.ENV as string;

export const setICookies = async (key: string, value: string, time: number) => {
  setCookie(key, value, {
    expires: new Date(Date.now() + time * 24 * 60 * 60 * 1000),
  });
  // if (env === "prod") return
  console.debug("success set cookie " + key);
};

export const getICookies = async (key: string) => {
  try {
    const [data] = await Promise.all([getCookie(key)]);

    if (data === undefined) {
      // if (env === "prod") return
      console.debug("error get cookie " + key);

      return "";
    }
    // if (env === "prod") return data
    console.debug("success get cookie " + key);

    return data;
  } catch (e) {
    // if (env === "prod") return ''
    console.debug("error get cookie " + e);

    return "";
  }
};

export const removeICookies = async (key: string) => {
  try {
    deleteCookie(key);
    // if (env === "prod") return
    console.debug("success remove cookie");
  } catch (e) {
    // if (env === "prod") return
    console.debug(e);
  }
};
