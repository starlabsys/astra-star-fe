"use client";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

import { ListDetailHistoryPkb } from "@/src/model/modelDetailHistory";
import { getDataDetailHistory } from "@/src/repository/history/historyRepository";
import { uploadDetailExcel } from "@/src/repository/pkb/pkbRepository";

const useDetailHistoryService = (uuid: string) => {
  const [listDetailHistory, setListDetailHistory] = useState<
    ListDetailHistoryPkb[]
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [listDetail, setListDetail] = useState<any>();

  const fetchDetailHistory = async (uuid: string) => {
    const resp = await getDataDetailHistory(uuid);

    if (resp === null) {
      return null;
    }

    setListDetailHistory(resp.result.listData ?? []); // Use nullish coalescing to default to an empty array
  };

  const pushDetailHistory = async (detail: any, pekerjaan: any) => {
    const newDetail = [
      {
        id: detail.id,
        tglBeli: detail.tglBeli,
        namaPemilik: detail.namaPemilik,
        kmAkhirMotor: detail.kmAkhirMotor,
        platNumber: detail.platNumber,
        nomorMesin: detail.nomorMesin,
        nomorRangka: detail.nomorRangka,
        typeMotor: detail.typeMotor,
        tahunMotor: detail.tahunMotor,
        kondisiBensin: detail.kondisiBensin,
        noKTP: detail.noKTP,
        noHP: detail.noHP,
        alamat: detail.alamat,
        provinsi: detail.provinsi,
        kota: detail.kota,
        kecamatan: detail.kecamatan,
        kelurahan: detail.kelurahan,
        kodePos: detail.kodePos,
        rt: detail.rt,
        rw: detail.rw,
        typeComingCustomer: detail.typeComingCustomer,
        alasanKeAhass: detail.alasanKeAhass,
        pekerjaan: pekerjaan, // Set pekerjaan dynamically
        hsoIdPenerima: detail.hsoIdPenerima ?? "",
        saranMekanik: detail.saranMekanik,
      },
    ];

    console.log("New Detail Item", newDetail);
    console.log("New Detail Pekerjaan", pekerjaan);

    const resp = await uploadDetailExcel(newDetail);

    if (resp === null) {
      return null;
    }

    onClose();
  };

  useEffect(() => {
    fetchDetailHistory(uuid); // Replace 'uuid' with the actual UUID
  }, []); // Include 'uuid' in the dependency array

  return {
    listDetailHistory,
    isOpen,
    onOpen,
    onClose,
    listDetail,
    setListDetail,
    pushDetailHistory,
  };
};

export default useDetailHistoryService;
