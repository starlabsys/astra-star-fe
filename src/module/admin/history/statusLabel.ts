/**
 * Terjemahan status mentah dari BE menjadi label dan warna yang dipakai
 * seragam di tabel detail maupun timeline.
 *
 * Sebelumnya tabel hanya membedakan SUCCESS (hijau) dan "selain itu" (oranye),
 * sehingga DELAYED, PENDING, FAILED, dan DELETED tampil identik — user tidak
 * bisa membedakan record yang sedang diproses dari yang benar-benar gagal.
 */

export interface TampilanStatus {
  label: string;
  className: string;
}

const STATUS: Record<string, TampilanStatus> = {
  SUCCESS: {
    label: "Selesai",
    className: "text-green-500 border-green-600 bg-green-50",
  },
  DELAYED: {
    label: "Diproses",
    className: "text-blue-500 border-blue-600 bg-blue-50",
  },
  DELAYED_COMPLETE: {
    label: "Proses Lanjutan",
    className: "text-blue-500 border-blue-600 bg-blue-50",
  },
  PENDING: {
    label: "Menunggu",
    className: "text-amber-500 border-amber-600 bg-amber-50",
  },
  FAILED: {
    label: "Gagal",
    className: "text-red-500 border-red-600 bg-red-50",
  },
  SKIPPED: {
    label: "Dilewati",
    className: "text-slate-500 border-slate-500 bg-slate-50",
  },
  DELETED: {
    label: "Dihapus",
    className: "text-slate-400 border-slate-400 bg-slate-50",
  },
};

/**
 * Urutan tahap sesuai alur PKB. Dipakai juga untuk menghitung progres, jadi
 * indeksnya harus tetap sejalan dengan enum StatusData di BE.
 */
export const URUTAN_TAHAP = [
  "START",
  "DONE_ANTRIAN",
  "DONE_PKB",
  "DONE_SPERPART",
  "DONE_MEKANIK",
  "DONE_FINAL_INPECTOR",
  "DONE_PAYMENT",
];

const TAHAP: Record<string, string> = {
  START: "Data Tersimpan",
  DONE_ANTRIAN: "Antrian Dibuat",
  DONE_PKB: "PKB Dibuat",
  DONE_SPERPART: "Suku Cadang Diterbitkan",
  DONE_MEKANIK: "Servis Mekanik Selesai",
  DONE_FINAL_INPECTOR: "Final Check Selesai",
  DONE_PAYMENT: "Pembayaran Selesai",
};

export const tampilanStatus = (status: string): TampilanStatus =>
  STATUS[status] ?? {
    label: status,
    className: "text-slate-500 border-slate-500 bg-slate-50",
  };

export const labelTahap = (statusData: string): string =>
  TAHAP[statusData] ?? statusData;

/** Nomor tahap untuk ditampilkan sebagai "3/7". 0 bila tidak dikenali. */
export const nomorTahap = (statusData: string): number =>
  URUTAN_TAHAP.indexOf(statusData) + 1;
