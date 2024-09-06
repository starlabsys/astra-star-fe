import { ConvertModelUser, ModelUser } from "@/src/model/modelUser";
import { loginLoading, postData } from "@/src/core/api/baseApi";
import { PkbData } from "@/src/module/admin/pkb/pkbService";
import { ConvertPkb, SuccessPkb } from "@/src/model/modelPkb";

export const uploadExcel = async (
  data: any
): Promise<SuccessPkb | null> => {

  const resp = postData("/upload-data-controller/upload", {
    tokenAntrian: data.tokenAntrian,
    tokenWork: data.tokenWork,
    jsonData: data.jsonData,
  });
  
  if (resp === null) {
    return null;
  }

//   console.log(resp);
  return ConvertPkb.toSuccessPkb(JSON.stringify(resp));
};
