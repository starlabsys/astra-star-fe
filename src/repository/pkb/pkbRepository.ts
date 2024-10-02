import { deleted, post } from "@/src/core/api/baseApi";
import { ConvertPkb, SuccessPkb } from "@/src/model/modelPkb";
import { ConvertToModelDeletePkb } from "@/src/model/modelDeletePkb";

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

export const deleteDetailPkb = async (id: number): Promise<any | null> => {
  const resp = await deleted("/upload-data-controller/delete/" + id, {});

  if (resp === null) {
    return null;
  }

  return ConvertToModelDeletePkb.toModelDeletePkb(JSON.stringify(resp));
};
