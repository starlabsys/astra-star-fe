export interface JSONDataPkb {
  id?: string;
  tglBeli: string;
  namaPemilik: string;
  kmAkhirMotor: number;
  platNumber: string;
  nomorMesin: string;
  nomorRangka: string;
  typeMotor: string;
  tahunMotor: string;
  kondisiBensin: number;
  noKTP: string;
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
  pekerjaan: PekerjaanInterface[];
  hsoIdPenerima: string;
  saranMekanik: string;
}

export interface PekerjaanInterface {
  kategoriPekerjaan: string;
  jenisPekerjaan: string;
  namaPekerjaan: string;
  gudang: string;
  sukuCadang: string[];
}
