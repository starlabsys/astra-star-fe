import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@nextui-org/react";
import useHistoryService from "./historyService";
import { ListUUID } from "@/src/model/modelHistory";

const TablePkb: React.FC = () => {
  const { listHistory } = useHistoryService();

  return (
    <>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>UUID Upload</TableColumn>
          <TableColumn>Tanggal Upload</TableColumn>
          <TableColumn>Total Data</TableColumn>
          <TableColumn>Sukses Upload</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {(listHistory ?? []).map((item: ListUUID, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.uuid}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell>{item.totalData}</TableCell>
              <TableCell>{item.totalDataSuccess}</TableCell>
              <TableCell>
                <Link color="primary" href={`/admin/history/${item.uuid}`}>
                  Detail
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TablePkb;
