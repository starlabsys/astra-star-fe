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
  activityPromotion: string;
  kategoriPekerjaan1: string;
  jenisPekerjaan1: string;
  namaPekerjaan1: string;
  gudang1: string;
  sukuCadang1: string;
  qtySukuCadang1: string;
  kategoriPekerjaan2: string;
  jenisPekerjaan2: string;
  namaPekerjaan2: string;
  gudang2: string;
  sukuCadang2: string;
  qtySukuCadang2: string;
  hsoIdPenerima: string;
  saranMekanik: string;
}

export const usePkbService = () => {
  const { setImportExcel } = usePkbContext(); // Use context's setImportExcel

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

          const validRows = rows.filter((row) => row && row.length >= 26); // Ensure row is not undefined and has all required columns

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
            hsoIdPenerima: row[21],
            saranMekanik: row[22],
            activityPromotion: row[23],
            kategoriPekerjaan1: row[24],
            jenisPekerjaan1: row[25],
            namaPekerjaan1: row[26],
            gudang1: row[27],
            sukuCadang1: row[28],
            qtySukuCadang1: row[29],
            kategoriPekerjaan2: row[30],
            jenisPekerjaan2: row[31],
            namaPekerjaan2: row[32],
            gudang2: row[33],
            sukuCadang2: row[34],
            qtySukuCadang2: row[35],
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

      if (data[i].namaPekerjaan1) {
        let sukuCadangData = [];

        if (data[i].sukuCadang1) {
          const splitPart = data[i].sukuCadang1.split("|");
          const splitQty = data[i].qtySukuCadang1.split("|");

          for (let key = 0; key < splitPart.length; key++) {
            if (splitPart[key] !== "") {
              let objectSukuCadang = {
                name: splitPart[key].toString(),
                qty: Number(splitQty[key]),
              };

              sukuCadangData.push(objectSukuCadang);
            }
          }
        }

        const listPekerjaan1 = {
          kategoriPekerjaan: data[i].kategoriPekerjaan1,
          jenisPekerjaan: data[i].jenisPekerjaan1,
          namaPekerjaan: data[i].namaPekerjaan1,
          gudang: data[i].gudang1,
          sukuCadang: sukuCadangData,
        };

        pekerjaan.push(listPekerjaan1);
      }

      // Pekerjaan 2
      if (data[i].namaPekerjaan2) {
        let sukuCadangData2 = [];

        if (data[i].sukuCadang2) {
          const splitPart2 = data[i].sukuCadang2.split("|");
          const splitQty2 = data[i].qtySukuCadang2.split("|");

          for (let key = 0; key < splitPart2.length; key++) {
            if (splitPart2[key] !== "") {
              let objectSukuCadang = {
                name: splitPart2[key].toString(),
                qty: Number(splitQty2[key]),
              };

              sukuCadangData2.push(objectSukuCadang);
            }
          }
        }

        const listPekerjaan2 = {
          kategoriPekerjaan: data[i].kategoriPekerjaan2,
          jenisPekerjaan: data[i].jenisPekerjaan2,
          namaPekerjaan: data[i].namaPekerjaan2,
          gudang: data[i].gudang2,
          sukuCadang: sukuCadangData2,
        };

        pekerjaan.push(listPekerjaan2);
      }

      let rt = "";
      let rw = "";

      if (data[i].rt.toString().length === 1) {
        rt = "00" + data[i].rt.toString();
      } else if (data[i].rt.toString() === "2") {
        // Fix here: comparing strings
        rt = "0" + data[i].rt.toString();
      } else {
        rt = data[i].rt.toString();
      }

      if (data[i].rw.toString().length === 1) {
        rw = "00" + data[i].rw.toString();
      } else if (data[i].rw.toString() === "2") {
        // Fix here: comparing strings
        rw = "0" + data[i].rw.toString();
      } else {
        rw = data[i].rw.toString();
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
        activePromotion: data[i].activityPromotion ?? "Non - Promotion",
        provinsi: data[i].provinsi,
        kota: data[i].kota,
        kecamatan: data[i].kecamatan,
        kelurahan: data[i].kelurahan,
        kodePos: data[i].kodePos.toString(),
        rt: rt,
        rw: rw,
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

    console.log(dataUpload);

    uploadExcel(dataUpload);

    setImportExcel([]);

    // Example: await axios.post('/api/upload', data);
    // Add any logic to handle the uploading of data.
  };

  useEffect(() => {}, []);

  return {
    importXlsx,
    uploadData,
  };
};
