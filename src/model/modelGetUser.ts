// To parse this data:
//
//   import { Convert, ModelGetUser } from "./file";
//
//   const modelGetUser = Convert.toModelGetUser(json);

export interface ModelGetUser {
  errorCode: string;
  message: string;
  result: ResultGetUser;
}

export interface ResultGetUser {
  id: number;
  username: string;
  password: string;
  name: string;
  refreshTokenAntrian: string;
  refreshTokenWork: string;
  refreshTokenPart: string;
  tokenAntrian: string;
  tokenWork: string;
  tokenPart: string;
  akun: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  statusToken: string;
  isUseMultiRole: boolean;
}

// Converts JSON strings to/from your types
export class ConvertToModelGetUser {
  public static toModelGetUser(json: string): ModelGetUser {
    return JSON.parse(json);
  }

  public static modelGetUserToJson(value: ModelGetUser): string {
    return JSON.stringify(value);
  }
}
