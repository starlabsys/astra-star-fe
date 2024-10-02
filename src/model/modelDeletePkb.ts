// To parse this data:
//
//   import { Convert, ModelDeletePkb } from "./file";
//
//   const modelDeletePkb = Convert.toModelDeletePkb(json);

export interface ModelDeletePkb {
  errorCode: string;
  message: string;
  result: Result;
}

export interface Result {
  id: number;
  nomorAntrian: string;
  customerId: string;
  customerNo: string;
  namaDealer: string;
  dealerId: string;
  status: string;
  statusData: string;
  tglBeli: string;
  namaPemilik: string;
  kmAkhirMotor: number;
  platNumber: string;
  nomorMesin: string;
  nomorRangka: string;
  typeMotor: string;
  tahunMotor: number;
  kondisiBensin: number;
  noKTP: string;
  namaStnk: string;
  noHP: string;
  alamat: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  kelurahan: string;
  kodePos: string;
  rt: string;
  rw: string;
  typeComingCustomer: string;
  alasanKeAhass: string;
  hsoIdPenerima: string;
  namaPenerima: string;
  saranMekanik: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  uuid: string;
  description: null;
}

// Converts JSON strings to/from your types
export class ConvertToModelDeletePkb {
  public static toModelDeletePkb(json: string): ModelDeletePkb {
    return JSON.parse(json);
  }

  public static modelDeletePkbToJson(value: ModelDeletePkb): string {
    return JSON.stringify(value);
  }
}
