import { useEffect, useState } from "react";

import {
  getProfileData,
  putRefreshNewToken,
} from "@/src/repository/profile/profileRepository";
import { ResultGetUser } from "@/src/model/modelGetUser";

const useProfileService = () => {
  const [profile, setProfile] = useState<ResultGetUser>();
  const fetchData = async () => {
    //
    const resp = await getProfileData();

    if (resp === null) {
      return null;
    }

    setProfile(resp.result);
  };

  const fetchRefreshToken = async (
    tokenAntrian: string,
    tokenWork: string,
    tokenPart: string,
  ) => {
    const resp = await putRefreshNewToken(tokenAntrian, tokenWork, tokenPart);

    if (resp === null) {
      return null;
    }
  };

  useEffect(() => {
    //
    fetchData();
  }, []);

  return {
    profile,
    setProfile,
    fetchData,
    fetchRefreshToken,
  };
};

export default useProfileService;
