"use client";
// src/module/admin/pkb/pkbService.ts
import { useState } from 'react';
import * as XLSX from 'xlsx';

export interface PkbData {
  nama_pemilik: string;
  tipe_kendaraan: string;
  plat_nomor: string;
  status: string;
}

const usePkbService = () => {
  const [importExcel, setImportExcel] = useState<PkbData[]>([]);

  const importXlsx = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target!.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json<PkbData>(worksheet, { header: 1 });
          const [header, ...rows] = json as any[];
          const formattedRows = rows.map(row => ({
            nama_pemilik: row[0],
            tipe_kendaraan: row[1],
            plat_nomor: row[2],
            status: row[3],
          }));
          setImportExcel(formattedRows);
          resolve();

          console.log(importExcel);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  return {
    importExcel,
    importXlsx,
  };
};

export default usePkbService;
