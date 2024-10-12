import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  getProfileData,
  putRefreshNewToken,
} from "@/src/repository/profile/profileRepository";
import { ResultGetUser } from "@/src/model/modelGetUser";

const useProfileService = () => {
  const [profile, setProfile] = useState<ResultGetUser>();
  const [tokenAntrian, setTokenAntrian] = useState<string>("");
  const [tokenWork, setTokenWork] = useState<string>("");
  const fetchData = async () => {
    //
    const resp = await getProfileData();

    if (resp === null) {
      return null;
    }

    setTokenAntrian(resp.result.refreshTokenAntrian);
    setTokenWork(resp.result.refreshTokenWork);

    setProfile(resp.result);

    if (resp.result.statusToken === "IS_ACTIVE") {
      Cookies.set("status_token", resp.result.statusToken);
    }
  };

  const fetchRefreshToken = async () => {
    const tokenPart = "";

    const resp = await putRefreshNewToken(tokenAntrian, tokenWork, tokenPart);

    if (resp === null) {
      return null;
    }

    setTokenAntrian(resp.refreshTokenAntrian);
    setTokenWork(resp.refreshTokenWork);

    await fetchData();
  };

  useEffect(() => {
    //
    fetchData();
  }, []);

  return {
    profile,
    setProfile,
    fetchData,
    tokenAntrian,
    setTokenAntrian,
    tokenWork,
    setTokenWork,
    fetchRefreshToken,
  };
};

export default useProfileService;
