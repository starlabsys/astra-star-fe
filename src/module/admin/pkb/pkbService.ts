import * as XLSX from "xlsx";
import { useEffect } from "react";

import { usePkbContext } from "@/src/app/(admin)/pkb/PkbContext";
import {
  JSONDataPkb,
  PekerjaanInterface,
} from "@/src/types/PkbExportInterface";
import { uploadExcel } from "@/src/repository/pkb/pkbRepository";

export interface PkbData {
  tglBeli: string;
  namaPemilik: string;
  kmAkhirMotor: string;
  platNumber: number;
  nomorMesin: string;
  nomorRangka: string;
  typeMotor: string;
  tahunMotor: string;
  kondisiBensin: string;
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
  kategoriPekerjaan: string;
  jenisPekerjaan: string;
  namaPekerjaan: string;
  gudang: string;
  sukuCadang: string;
  qty: string;
  hsoIdPenerima: string;
  saranMekanik: string;
}

export const usePkbService = () => {
  const { importExcel, setImportExcel } = usePkbContext(); // Use context's setImportExcel

  const excelDateFormatted = (serial: number): string => {
    const daysToAdd = 1;
    const dateExcel = Number(serial);
    const excelEpoch = new Date(1899, 11, 30); // Excel's epoch date is 30th December 1899
    const date = new Date(excelEpoch.getTime() + dateExcel * 86400000); // Convert serial number to milliseconds since Excel epoch

    // Add the specified number of days
    date.setDate(date.getDate() + daysToAdd);

    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed, so add 1) and pad with zero
    const year = date.getFullYear(); // Get full year

    return `${day}-${month}-${year}`;
  };

  const importXlsx = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json<PkbData>(worksheet, {
            header: 1,
          });
          const [header, ...rows] = json as any[];

          const validRows = rows.filter((row) => row && row.length >= 28); // Ensure row is not undefined and has all required columns

          if (validRows.length === 0) {
            console.error("No valid data rows found in the Excel sheet.");
            alert("No valid data rows found in the Excel sheet.");

            return; // Exit if no valid data
          }

          const formattedRows: PkbData[] = validRows.map((row) => ({
            tglBeli: excelDateFormatted(row[0]),
            namaPemilik: row[1],
            kmAkhirMotor: row[2],
            platNumber: row[3],
            nomorMesin: row[4],
            nomorRangka: row[5],
            typeMotor: row[6],
            tahunMotor: row[7],
            kondisiBensin: row[8],
            noKTP: row[9],
            noHP: row[10],
            alamat: row[11],
            provinsi: row[12],
            kota: row[13],
            kecamatan: row[14],
            kelurahan: row[15],
            kodePos: row[16],
            rt: row[17],
            rw: row[18],
            typeComingCustomer: row[19],
            alasanKeAhass: row[20],
            // pekerjaan: row[21],
            kategoriPekerjaan: row[21],
            jenisPekerjaan: row[22],
            namaPekerjaan: row[23],
            gudang: row[24],
            sukuCadang: row[25],
            qty: row[26],
            hsoIdPenerima: row[27],
            saranMekanik: row[28],
          }));

          setImportExcel(formattedRows); // Update the context state with valid rows
          resolve();
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadData = async (data: PkbData[]) => {
    // Perform an action to upload data, such as making a POST request to an API endpoint

    let jsonData: JSONDataPkb[] = [];

    for (let i = 0; i < data.length; i++) {
      let pekerjaan: PekerjaanInterface[] = [];

      let splitDataKategori = data[i].kategoriPekerjaan.split("|");
      let splitDataJenis = data[i].jenisPekerjaan.split("|");
      let splitDataNama = data[i].namaPekerjaan.split("|");
      let splitDataGudang = data[i].gudang.split("|");
      // let splitDataSukuCadang = data[i].sukuCadang
      //   ? data[i].sukuCadang.split("|")
      //   : [];
      // let listSukuCadang = [];

      if (data[i].sukuCadang !== null) {
        let splitDataSukuCadang = data[i].sukuCadang.split("|");
        let splitDataQtySukuCadang = data[i].qty.split("|");

        for (let j = 0; j < splitDataKategori.length; j++) {
          pekerjaan.push({
            kategoriPekerjaan: splitDataKategori[j],
            jenisPekerjaan: splitDataJenis[j],
            namaPekerjaan: splitDataNama[j],
            gudang: splitDataGudang[j],
            sukuCadang: [
              {
                name: splitDataSukuCadang[j],
                qty: Number(splitDataQtySukuCadang[j]),
              },
            ],
          });
        }
      } else {
        for (let j = 0; j < splitDataKategori.length; j++) {
          pekerjaan.push({
            kategoriPekerjaan: splitDataKategori[j],
            jenisPekerjaan: splitDataJenis[j],
            namaPekerjaan: splitDataNama[j],
            gudang: splitDataGudang[j],
            sukuCadang: [],
          });
        }
      }

      jsonData.push({
        id: "",
        tglBeli: data[i].tglBeli,
        namaPemilik: data[i].namaPemilik,
        kmAkhirMotor: Number(data[i].kmAkhirMotor),
        platNumber: data[i].platNumber.toString(),
        nomorMesin: data[i].nomorMesin,
        nomorRangka: data[i].nomorRangka,
        typeMotor: data[i].typeMotor,
        tahunMotor: data[i].tahunMotor.toString(),
        kondisiBensin: Number(data[i].kondisiBensin),
        noKTP: data[i].noKTP.toString(),
        noHP: data[i].noHP.toString(),
        alamat: data[i].alamat,
        provinsi: data[i].provinsi,
        kota: data[i].kota,
        kecamatan: data[i].kecamatan,
        kelurahan: data[i].kelurahan,
        kodePos: data[i].kodePos.toString(),
        rt: data[i].rt.toString(),
        rw: data[i].rw.toString(),
        typeComingCustomer: data[i].typeComingCustomer,
        alasanKeAhass: data[i].alasanKeAhass,
        pekerjaan: pekerjaan,
        hsoIdPenerima: data[i].hsoIdPenerima,
        saranMekanik: data[i].saranMekanik,
      });
    }

    const dataUpload = {
      jsonData: jsonData,
    };

    const resp = await uploadExcel(dataUpload);

    if (resp === null) {
      return null;
    }

    // Example: await axios.post('/api/upload', data);
    // Add any logic to handle the uploading of data.
  };

  useEffect(() => {}, []);

  return {
    importXlsx,
    uploadData,
  };
};
