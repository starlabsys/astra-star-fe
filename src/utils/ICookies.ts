import { deleteCookie, getCookie, setCookie } from "cookies-next";

const env = process.env.ENV as string;

/**
 * Umur sesi, dalam jam. Harus sama dengan masa berlaku JWT di backend
 * (`GenerateToken.ts` → `expiresIn: "1h"`).
 *
 * Sebelumnya cookie disimpan 1 hari sementara token hanya hidup 1 jam, jadi
 * selama 23 jam berikutnya aplikasi tampak masih login padahal setiap request
 * ditolak 401 — dan halaman tampil kosong seolah datanya yang tidak ada.
 */
export const UMUR_SESI_JAM = 1;

/** Cookie yang membentuk satu sesi login. */
const COOKIE_SESI = ["token", "status_token", "name"];

export const setICookiesJam = async (
  key: string,
  value: string,
  jam: number,
) => {
  setCookie(key, value, {
    expires: new Date(Date.now() + jam * 60 * 60 * 1000),
  });
};

/** Bersihkan seluruh cookie sesi sekaligus, supaya tidak ada yang tertinggal. */
export const hapusSesi = () => {
  for (const key of COOKIE_SESI) {
    deleteCookie(key);
  }
};

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
