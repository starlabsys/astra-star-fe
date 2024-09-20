// To parse this data:
//
//   import { Convert, ModelRefreshToken } from "./file";
//
//   const modelRefreshToken = Convert.toModelRefreshToken(json);

export interface ModelRefreshToken {
  tokenAntrian: string;
  refreshTokenAntrian: string;
  tokenWork: string;
  refreshTokenWork: string;
}

// Converts JSON strings to/from your types
export class ConvertToModelRefreshToken {
  public static toModelRefreshToken(json: string): ModelRefreshToken {
    return JSON.parse(json);
  }

  public static modelRefreshTokenToJson(value: ModelRefreshToken): string {
    return JSON.stringify(value);
  }
}
