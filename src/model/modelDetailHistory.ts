// To parse this data:
//
//   import { Convert, ModelDetailHistory } from "./file";
//
//   const modelDetailHistory = Convert.toModelDetailHistory(json);

export interface ModelDetailHistory {
  errorCode: string;
  message:   string;
  result:    Result;
}

export interface Result {
  listData: ListDetailHistoryPkb[];
}

export interface ListDetailHistoryPkb {
  id:                 string;
  alamat:             string;
  provinsi:           string;
  kota:               string;
  kecamatan:          string;
  kelurahan:          string;
  kodePos:            string;
  rt:                 string;
  rw:                 string;
  typeComingCustomer: string;
  alasanKeAhass:      string;
  hsoIdPenerima:      string;
  namaPenerima:       string;
  customerId:         string;
  status:             string;
  dealerId:           string;
  statusData:         string;
  namaDealer:         string;
  kmAkhirMotor:       number;
  platNumber:         string;
  nomorMesin:         string;
  nomorRangka:        string;
  typeMotor:          string;
  tahunMotor:         number;
  kondisiBensin:      number;
  noKTP:              string;
  namaStnk:           string;
  noHP:               string;
  namaPemilik:        string;
  saranMekanik:       string;
  tglBeli:            string;
  nomorAntrian:       string;
  customerNo:         string;
  createdAt:          string;
  description:        string;
  pekerjaan:          Pekerjaan[];
}

export interface Pekerjaan {
  gudang:            string;
  jenisPekerjaan:    string;
  kategoriPekerjaan: string;
  namaPekerjaan:     string;
  sukuCadang:        any[];
}

// Converts JSON strings to/from your types
export class ConvertDetailModelHistory {
  public static toModelDetailHistory(json: string): ModelDetailHistory {
    return JSON.parse(json);
  }

  public static modelDetailHistoryToJson(value: ModelDetailHistory): string {
    return JSON.stringify(value);
  }
}
