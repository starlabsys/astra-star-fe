export interface SuccessPkb {
  status: boolean;
  message: string;
}

// ConvertPkbs JSON strings to/from your types
export class ConvertPkb {
  public static toSuccessPkb(json: string): SuccessPkb {
    return JSON.parse(json);
  }

  public static successPkbToJson(value: SuccessPkb): string {
    return JSON.stringify(value);
  }
}
