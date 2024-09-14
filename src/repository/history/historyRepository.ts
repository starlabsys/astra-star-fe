import { post } from "@/src/core/api/baseApi";
import {
  ConvertDetailModelHistory,
  ModelDetailHistory,
} from "@/src/model/modelDetailHistory";
import { ConvertModelHistory, ModelHistory } from "@/src/model/modelHistory";

export const getDataHistory = async (): Promise<ModelHistory | null> => {
  const resp = await post("/history", {
    limit: 10,
    skip: 0,
  });

  if (resp === null) {
    return null;
  }

  return ConvertModelHistory.toModelHistory(JSON.stringify(resp));
};

export const getDataDetailHistory = async (
  uuid: string,
): Promise<ModelDetailHistory | null> => {
  const resp = await post("/history/detail", {
    uuid,
  });

  if (resp === null) {
    return null;
  }

  // Convert the response to the correct type
  return ConvertDetailModelHistory.toModelDetailHistory(JSON.stringify(resp));
};
