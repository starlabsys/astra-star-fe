// src/components/TablePkb.tsx
import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import usePkbService from '@/src/module/admin/pkb/pkbService';

const TablePkb: React.FC = () => {
  const { importExcel } = usePkbService();

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>Nama Pemilik</TableColumn>
        <TableColumn>Tipe Kendaraan</TableColumn>
        <TableColumn>Plat Nomor</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {importExcel.length > 0 ? (
          importExcel.map((data, index) => (
            <TableRow key={index}>
              <TableCell>{data.nama_pemilik || 'N/A'}</TableCell>
              <TableCell>{data.tipe_kendaraan || 'N/A'}</TableCell>
              <TableCell>{data.plat_nomor || 'N/A'}</TableCell>
              <TableCell>{data.status || 'N/A'}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell >No data available</TableCell>
            <TableCell>No data available</TableCell>
            <TableCell>No data available</TableCell>
            <TableCell>No data available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TablePkb;
