import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

import useHistoryService from "./historyService";

import { useHistoryContext } from "@/src/app/(admin)/history-pkb/HistoryProvider";

const TablePkb: React.FC = () => {
  const { listHistory } = useHistoryService();
  const { setSelectedUuid } = useHistoryContext(); // Get setUuid function from context

  const handleOrderClick = (item: any) => {
    setSelectedUuid(item); // Correctly pass the object of UuidPr
    // console.log(uuid);
  };

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>UUID Upload</TableColumn>
        <TableColumn>Tanggal Upload</TableColumn>
        <TableColumn>Total Data</TableColumn>
        <TableColumn>Sukses Upload</TableColumn>
        <TableColumn>Aksi</TableColumn>
      </TableHeader>
      <TableBody>
        {(listHistory ?? []).map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell>{item.uuid}</TableCell>
            <TableCell>{item.createdAt}</TableCell>
            <TableCell>{item.totalData}</TableCell>
            <TableCell>{item.totalDataSuccess}</TableCell>
            <TableCell>
              <Button
                className="mt-10"
                color="default"
                size="lg"
                variant="bordered"
                onClick={() => handleOrderClick(item)} // Handle the click event
              >
                <Link href="/history-pkb/detail">Pesan Sekarang</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TablePkb;
