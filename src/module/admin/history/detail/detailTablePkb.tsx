import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";

import ModalDetailHistory from "./modalDetailHistory";

import { ListDetailHistoryPkb } from "@/src/model/modelDetailHistory";
import useDetailHistoryService from "@/src/module/admin/history/detail/detailHistoryService";
import {
  URUTAN_TAHAP,
  labelTahap,
  nomorTahap,
  tampilanStatus,
} from "@/src/module/admin/history/statusLabel";

interface DetailTablePkbProps {
  data: ListDetailHistoryPkb[];
  uuid: string;
}

const DetailTablePkb: React.FC<DetailTablePkbProps> = ({ data, uuid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<ListDetailHistoryPkb | null>(
    null,
  ); // Initialize with null
  const { fetchDeleteData } = useDetailHistoryService(uuid);

  const handleOpen = (item: ListDetailHistoryPkb) => {
    setSelectedItem(item); // Set the selected item
    onOpen(); // Open the modal
  };

  return (
    <>
      <Table aria-label="Detail History Table">
        <TableHeader>
          <TableColumn>Nama Pemilik</TableColumn>
          <TableColumn>Plat Nomor</TableColumn>
          <TableColumn>Tipe Motor</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Tahap Terakhir</TableColumn>
          <TableColumn>Keterangan</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item: ListDetailHistoryPkb, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.namaPemilik}</TableCell>
              <TableCell>{item.platNumber}</TableCell>
              <TableCell>{item.typeMotor}</TableCell>
              <TableCell>{item.alamat}</TableCell>
              <TableCell>
                <div
                  className={`${tampilanStatus(item.status).className} border-1 text-center w-32 rounded-lg p-2 font-semibold`}
                >
                  {tampilanStatus(item.status).label}
                </div>
              </TableCell>
              <TableCell>
                <div className="w-48">
                  <span className="font-medium">
                    {labelTahap(item.statusData)}
                  </span>
                  {nomorTahap(item.statusData) > 0 && (
                    <span className="block text-xs text-slate-400">
                      Tahap {nomorTahap(item.statusData)} dari{" "}
                      {URUTAN_TAHAP.length}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {/* Alasan gagal/dilewati sebelumnya hanya terlihat setelah
                    membuka modal, padahal itu justru yang dicari user ketika
                    sebuah baris tidak selesai. */}
                <div
                  className="max-w-xs truncate text-sm text-slate-500"
                  title={item.description}
                >
                  {item.description || "-"}
                </div>
              </TableCell>
              <TableCell className={`gap-4`}>
                <Button
                  className="capitalize"
                  color="warning"
                  variant="flat"
                  onPress={() => handleOpen(item)} // Pass item to handleOpen
                >
                  Detail
                </Button>
                <Button
                  className="capitalize"
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    fetchDeleteData(Number(item.id), uuid);
                  }} // Pass item to handleOpen
                >
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedItem && ( // Ensure selectedItem is not null before rendering the modal
        <ModalDetailHistory
          isOpen={isOpen}
          item={selectedItem} // Pass the selected item to the modal
          uuid={uuid}
          onClose={onClose}
        />
      )}
    </>
  );
};

export default DetailTablePkb;
