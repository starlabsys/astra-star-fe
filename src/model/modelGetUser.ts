// To parse this data:
//
//   import { Convert, ModelGetUser } from "./file";
//
//   const modelGetUser = Convert.toModelGetUser(json);

export interface ModelGetUser {
  id: number;
  username: string;
  password: string;
  name: string;
  refreshTokenAntrian: string;
  refreshTokenWork: string;
  akun: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  statusToken: string;
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
