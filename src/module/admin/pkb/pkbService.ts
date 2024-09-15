import * as XLSX from "xlsx";

import { usePkbContext } from "@/src/app/(admin)/pkb/PkbContext";
import { uploadExcel } from "@/src/repository/pkb/pkbRepository";
import {
  JSONDataPkb,
  PekerjaanInterface,
} from "@/src/types/PkbExportInterface";

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

    const dateFormatted = `${day}-${month}-${year}`;

    return dateFormatted;
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

          // const formattedRows = rows.map(row => ({

          //   tglBeli: excelDateFormatted(row[0]),
          //   namaPemilik: row[1],
          //   kmAkhirMotor: row[2],
          //   platNumber: row[3],
          //   nomorMesin: row[4],
          //   nomorRangka: row[5],
          //   typeMotor: row[6],
          //   tahunMotor: row[7],
          //   kondisiBensin: row[8],
          //   noKTP: row[9],
          //   noHP: row[10],
          //   alamat: row[11],
          //   provinsi: row[12],
          //   kota: row[13],
          //   kecamatan: row[14],
          //   kelurahan: row[15],
          //   kodePos: row[16],
          //   rt: row[17],
          //   rw: row[18],
          //   typeComingCustomer: row[19],
          //   alasanKeAhass: row[20],
          //   kategoriPekerjaan: row[21],
          //   jenisPekerjaan: row[22],
          //   namaPekerjaan: row[23],
          //   gudang: row[24],
          //   sukuCadang: row[25],
          //   hsoIdPenerima: row[26],
          //   saranMekanik: row[27],
          // }));

          // setImportExcel(formattedRows); // Correctly update the context state
          // resolve();

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
            hsoIdPenerima: row[26],
            saranMekanik: row[27],
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
      let splitDataSukuCadang = data[i].sukuCadang
        ? data[i].sukuCadang.split("|")
        : [];

      for (let j = 0; j < splitDataKategori.length; j++) {
        pekerjaan.push({
          kategoriPekerjaan: splitDataKategori[j],
          jenisPekerjaan: splitDataJenis[j],
          namaPekerjaan: splitDataNama[j],
          gudang: splitDataGudang[j],
          sukuCadang: splitDataSukuCadang[j] ? [splitDataSukuCadang[j]] : [],
        });
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
      // tokenAntrian:
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IkUwM0FBMkNEMzQ1OTE5NkIxNDBEMzVEQUFGOEY3OUQ3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LXRybi5zdGFyLmFzdHJhLmNvLmlkLyIsIm5iZiI6MTcyNTE4NDUyMiwiaWF0IjoxNzI1MTg0NTIyLCJleHAiOjE3MjUyNzA5MjIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsInN0YXJfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbImV4dGVybmFsIl0sImNsaWVudF9pZCI6InN0YXJfYXBpIiwic3ViIjoiNTQ4YTU2MjQwOTUxNGRhZDhhNTYxYjY3MTgwMjJjNTgiLCJhdXRoX3RpbWUiOjE3MjUxODQ1MjEsImlkcCI6IkF6dXJlQjJDIiwibmFtZSI6InN0YXJraW9zazA4MjY3IHN0YXJraW9zazA4MjY3IiwiZ2l2ZW5uYW1lIjoic3Rhcmtpb3NrMDgyNjciLCJzdXJuYW1lIjoic3Rhcmtpb3NrMDgyNjciLCJlbWFpbCI6InN0YXJraW9zazA4MjY3IiwiZGVhbGVyVGltZXpvbmUiOiIwNzowMDowMCIsInJvbGVzIjoiW3tcdTAwMjJJZFx1MDAyMjpcdTAwMjIwNTkyNWE0ODhhZWQ0ZTAzOWNjYjFhOTIyYjQ1NDVhNlx1MDAyMixcdTAwMjJDb25uZWN0aW9uVHlwZVx1MDAyMjpcdTAwMjJCdXNpbmVzc0FyZWFcdTAwMjIsXHUwMDIyQ29ubmVjdGlvbklkXHUwMDIyOlx1MDAyMjI5YTI5ZjVjOTg0MGVkMTFhOWI4ODAzOGZiZTEwYzJmXHUwMDIyfV0iLCJzaWQiOiJEMkY5MDQ1QkEyREFCMjhCNzMxOUU4NTQ4NjkzNkREQiIsImp0aSI6IjQzMTY5NkU1MjQ1MTU3NDVDRTA0MzkwNjU0MjA4M0NBIn0.f7iGV2bShhdzu2DE9C50WnAtydNFOLez5jrNrC5BIsfph7bKOkKE1A0jpuS2AZQLd_aI5--gy6na747g6e7jjzPDlSGyGUrE725zMnLDX5WcYl3kozv_ZAhcq4PtAvi1BLi4Ygo5wdSdW-tBtpUMD2swTz7Zrgx4cAI_PJGofB5Y1VR3pC7BaOCzeg6rjZkxcwvZKMT4iHWWzAO6JRv9CrRjMigsapTcNsMK_UdLpHJGZOIWm46CshlshYGr76ZPbVxYkqYCw-R2UY4m0dDw1Bk_O9baCvQO0CYDgTK7yeESYbENgqkZ1g5zCaNyiaoQHd7_Cxp7GMZvdEWz_dpRqA",
      // tokenWork:
      //   "eyJhbGciOiJSUzI1NiIsImtpZCI6IkUwM0FBMkNEMzQ1OTE5NkIxNDBEMzVEQUFGOEY3OUQ3IiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LXRybi5zdGFyLmFzdHJhLmNvLmlkLyIsIm5iZiI6MTcyNTE4NDU4MSwiaWF0IjoxNzI1MTg0NTgxLCJleHAiOjE3MjUyNzA5ODEsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCIsInN0YXJfYXBpIiwib2ZmbGluZV9hY2Nlc3MiXSwiYW1yIjpbImV4dGVybmFsIl0sImNsaWVudF9pZCI6InN0YXJfYXBpIiwic3ViIjoiMDY1MGE3YWFkZDc3NDZlNjgzMDMyNzZmODk2OWY4YzkiLCJhdXRoX3RpbWUiOjE3MjUxODQ1NzksImlkcCI6IkF6dXJlQjJDIiwibmFtZSI6InN0YXJzZXJ2aWNlYWR2aXNvcjA4MjY3IHN0YXJzZXJ2aWNlYWR2aXNvcjA4MjY3IiwiZ2l2ZW5uYW1lIjoic3RhcnNlcnZpY2VhZHZpc29yMDgyNjciLCJzdXJuYW1lIjoic3RhcnNlcnZpY2VhZHZpc29yMDgyNjciLCJlbWFpbCI6InN0YXJzZXJ2aWNlYWR2aXNvcjA4MjY3IiwiZGVhbGVyVGltZXpvbmUiOiIwNzowMDowMCIsInJvbGVzIjoiW3tcdTAwMjJJZFx1MDAyMjpcdTAwMjJlNDkyMTBlN2I0OGU0MzJkOGYyNjA5NDcxYTU4ZTgyZFx1MDAyMixcdTAwMjJDb25uZWN0aW9uVHlwZVx1MDAyMjpcdTAwMjJCdXNpbmVzc0FyZWFcdTAwMjIsXHUwMDIyQ29ubmVjdGlvbklkXHUwMDIyOlx1MDAyMjI5YTI5ZjVjOTg0MGVkMTFhOWI4ODAzOGZiZTEwYzJmXHUwMDIyfSx7XHUwMDIySWRcdTAwMjI6XHUwMDIyZDM0MTc5ODFhYzkzNGQ4ZWJhMzU0ZjI5MjJhNmFlMGFcdTAwMjIsXHUwMDIyQ29ubmVjdGlvblR5cGVcdTAwMjI6XHUwMDIyQnVzaW5lc3NBcmVhXHUwMDIyLFx1MDAyMkNvbm5lY3Rpb25JZFx1MDAyMjpcdTAwMjIyOWEyOWY1Yzk4NDBlZDExYTliODgwMzhmYmUxMGMyZlx1MDAyMn0se1x1MDAyMklkXHUwMDIyOlx1MDAyMjgwNTQ1NDY2Y2RiMTQyZmZhN2RiMDc4NTNlMTg4YjNmXHUwMDIyLFx1MDAyMkNvbm5lY3Rpb25UeXBlXHUwMDIyOlx1MDAyMkJ1c2luZXNzQXJlYVx1MDAyMixcdTAwMjJDb25uZWN0aW9uSWRcdTAwMjI6XHUwMDIyMjlhMjlmNWM5ODQwZWQxMWE5Yjg4MDM4ZmJlMTBjMmZcdTAwMjJ9XSIsInNpZCI6IjZCOURBNDRCMzFCNzA0Njg5QUIxRTI4MERCNUM3MkUyIiwianRpIjoiQ0Y3QUY5QzlFNERBRTUxQTE0RkVFMzAwRDI2QzkzNUMifQ.M5nBeUBQHGG6i4TQi1plwui3EfnygGvaUKqHBrh_4OH59Npka6UnZZ9yQLU5X6lDxWS9qwky2L2aijS_KCTv6FtNvwR4HYCOAMAvcyb0ksSNszvf51adjfDRDbe4JO6lPI3oyc-WVD2rbSe2BoXd8co0CqfS2o7CX0SIVzGE3rw1Aviq_GdFAcmh6-BvcfL22XUjV_rn2D3AvYcYW4S9Fzl9lSoJSiGfAXqy48aU8qG7mS-hjA0Uh440avHOjoH8Q0kShraIByjQJuAN_-U36XpySDzXt7ovYyH9GnBtL70bE9Ab-o6fVhpYIsVysSf1hEZrL5XtXsDPNRFlwTmo5A",
      jsonData: jsonData,
    };

    const resp = await uploadExcel(dataUpload);

    // Example: await axios.post('/api/upload', data);
    // Add any logic to handle the uploading of data.
  };

  return {
    importXlsx,
    uploadData,
  };
};
