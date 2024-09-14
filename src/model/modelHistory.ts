// To parse this data:
//
//   import { Convert, ModelHistory } from "./file";
//
//   const modelHistory = Convert.toModelHistory(json);

export interface ModelHistory {
  errorCode: string;
  message: string;
  result: Result;
}

export interface Result {
  listUUID: ListUUID[];
}

export interface ListUUID {
  uuid: string;
  totalDataSuccess: number;
  createdAt: string;
  totalData: number;
}

// Converts JSON strings to/from your types
export class ConvertModelHistory {
  public static toModelHistory(json: string): ModelHistory {
    return JSON.parse(json);
  }

  public static modelHistoryToJson(value: ModelHistory): string {
    return JSON.stringify(value);
  }
}
