import { post } from "@/src/core/api/baseApi";
import { ConvertPkb, SuccessPkb } from "@/src/model/modelPkb";

export const uploadExcel = async (data: any): Promise<SuccessPkb | null> => {
  const resp = post("/upload-data-controller/upload", {
    jsonData: data.jsonData,
  });

  if (resp === null) {
    return null;
  }

  //   console.log(resp);
  return ConvertPkb.toSuccessPkb(JSON.stringify(resp));
};
export const uploadDetailExcel = async (
  data: any,
): Promise<SuccessPkb | null> => {
  const resp = post("/upload-data-controller/upload", {
    jsonData: data,
  });

  if (resp === null) {
    return null;
  }

  //   console.log(resp);
  return ConvertPkb.toSuccessPkb(JSON.stringify(resp));
};
