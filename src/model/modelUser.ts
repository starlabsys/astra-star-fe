export interface ModelUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
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
