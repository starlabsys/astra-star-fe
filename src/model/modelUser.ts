// To parse this data:
//
//   import { Convert, ModelUser } from "./file";
//
//   const modelUser = Convert.toModelUser(json);

export interface ModelUser {
  errorCode: string;
  message:   string;
  result:    Result;
}

export interface Result {
  token: string;
  user:  User;
}

export interface User {
  username: string;
  name:     string;
  id:       number;
}

// Converts JSON strings to/from your types
export class ConvertModelUser {
  public static toModelUser(json: string): ModelUser {
      return JSON.parse(json);
  }

  public static modelUserToJson(value: ModelUser): string {
      return JSON.stringify(value);
  }
}
