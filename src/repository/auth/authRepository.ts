
import { ConvertModelUser, ModelUser } from "@/src/model/modelUser";
import { post, postLogin } from "@/src/core/api/baseApi";

export const login = async (
  username: string,
  password: string,
): Promise<ModelUser | null> => {
  const resp = await postLogin("/auth/login", {
    username: username,
    password: password
  });

  if (resp === null) {
    return null;
  }

  console.log("Response Repository Service",resp)

  return ConvertModelUser.toModelUser(JSON.stringify(resp));
};

