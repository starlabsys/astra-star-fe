import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { usePkbContext } from "./PkbContext";
import ModalDetailPkb from "./ModalDetailPkb";

import { PkbData, usePkbService } from "@/src/module/admin/pkb/pkbService";

const TablePkb: React.FC = () => {
  const { importExcel } = usePkbContext(); // Correctly use the context
  const { uploadData } = usePkbService();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<PkbData | null>(null);

  const submit = async () => {
    let dataExcel: PkbData[] = importExcel;

    await uploadData(dataExcel);
  };

  const handleOpen = (item: PkbData) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Nama Pemilik</TableColumn>
          <TableColumn>Tipe Kendaraan</TableColumn>
          <TableColumn>Plat Nomor</TableColumn>
          <TableColumn>Alasan Ke Ahass</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {importExcel.length > 0 ? (
            importExcel.map((data: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{data.namaPemilik || "N/A"}</TableCell>
                <TableCell>{data.typeMotor || "N/A"}</TableCell>
                <TableCell>{data.platNumber || "N/A"}</TableCell>
                <TableCell>{data.alasanKeAhass || "N/A"}</TableCell>
                <TableCell>{data.alamat || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    className="capitalize"
                    color="warning"
                    variant="flat"
                    onPress={() => {
                      handleOpen(data);
                    }}
                  >
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>No data available</TableCell>
              <TableCell>No data available</TableCell>
              <TableCell>No data available</TableCell>
              <TableCell>No data available</TableCell>
              <TableCell>No data available</TableCell>
              <TableCell>No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button
          className={`mt-5 mx-10 text-xl ${importExcel.length == 0 ? "hidden" : ""}`}
          color="success"
          type="button"
          variant={"solid"}
          onPress={submit}
        >
          Upload Data
        </Button>
        {selectedItem && (
          <ModalDetailPkb
            isOpen={isOpen}
            item={selectedItem}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default TablePkb;
