import { ConvertModelUser, ModelUser } from "@/src/model/modelUser";
import { postLogin } from "@/src/core/api/baseApi";

export const login = async (
  username: string,
  password: string,
): Promise<ModelUser | null> => {
  const resp = await postLogin("/auth/login", {
    username: username,
    password: password,
  });

  if (resp === null) {
    return null;
  }

  return ConvertModelUser.toModelUser(JSON.stringify(resp));
};
