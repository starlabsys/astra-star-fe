import { useEffect, useState } from "react";

import {
  getProfileData,
  putRefreshNewToken,
} from "@/src/repository/profile/profileRepository";
import { ModelGetUser } from "@/src/model/modelGetUser";

const useProfileService = () => {
  const [profile, setProfile] = useState<ModelGetUser>();
  const fetchData = async () => {
    //
    const resp = await getProfileData();

    if (resp === null) {
      return null;
    }

    setProfile(resp);
  };

  const fetchRefreshToken = async (tokenAntrian: string, tokenWork: string) => {
    const resp = await putRefreshNewToken(tokenAntrian, tokenWork);
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
