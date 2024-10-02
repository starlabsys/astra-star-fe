import { ConvertToModelGetUser, ModelGetUser } from "@/src/model/modelGetUser";
import { getOnly, putOnly } from "@/src/core/api/baseApi";
import {
  ConvertToModelRefreshToken,
  ModelRefreshToken,
} from "@/src/model/modelRefreshToken";

export const getProfileData = async (): Promise<ModelGetUser | null> => {
  const resp = await getOnly("/users/me", {});

  if (resp === null) {
    return null;
  }

  return ConvertToModelGetUser.toModelGetUser(JSON.stringify(resp.data));
};

export const putRefreshNewToken = async (
  tokenAntrian: string,
  tokenWork: string,
  tokenPart: string,
): Promise<ModelRefreshToken | null> => {
  const resp = await putOnly("/users/updateRefreshToken", {
    tokenAntrian,
    tokenWork,
    tokenPart,
  });

  if (resp === null) {
    return null;
  }

  return ConvertToModelRefreshToken.toModelRefreshToken(
    JSON.stringify(resp.data),
  );
};
