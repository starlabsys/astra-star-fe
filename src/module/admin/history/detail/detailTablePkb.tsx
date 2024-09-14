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

import { ListDatum } from "@/src/model/modelDetailHistory";

interface DetailTablePkbProps {
  data: ListDatum[];
}

const DetailTablePkb: React.FC<DetailTablePkbProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState<ListDatum | null>(null); // Initialize with null

  const handleOpen = (item: ListDatum) => {
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
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((item: ListDatum, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.namaPemilik}</TableCell>
              <TableCell>{item.platNumber}</TableCell>
              <TableCell>{item.typeMotor}</TableCell>
              <TableCell>{item.alamat}</TableCell>
              <TableCell>
                <div
                  className={`${item.status === "SUCCESS" ? "text-green-400 border-1 border-green-600" : "text-orange-300 border-1 border-orange-600"} text-center w-1/3 rounded-lg p-2 font-semibold`}
                >
                  {item.status}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  className="capitalize"
                  color="warning"
                  variant="flat"
                  onPress={() => handleOpen(item)} // Pass item to handleOpen
                >
                  Detail
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
          onClose={onClose}
        />
      )}
    </>
  );
};

export default DetailTablePkb;
