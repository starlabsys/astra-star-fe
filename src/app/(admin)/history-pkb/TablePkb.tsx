import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";


const TablePkb = () => {
  return (
    <>
        <Table aria-label="Example static collection table">
            <TableHeader>
                <TableColumn>Nama Pemilik</TableColumn>
                <TableColumn>Tipe Kendaraan</TableColumn>
                <TableColumn>Plat Nomor</TableColumn>
                <TableColumn>Status</TableColumn>
            </TableHeader>
            <TableBody>
                <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>Matic</TableCell>
                    <TableCell>KB 1123 HF</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Manual</TableCell>
                    <TableCell>KB 1123 HF</TableCell>
                    <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Manual</TableCell>
                    <TableCell>KB 1123 HF</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Matic</TableCell>
                    <TableCell>KB 1123 HF</TableCell>
                    <TableCell>Vacation</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </>
  )
}

export default TablePkb