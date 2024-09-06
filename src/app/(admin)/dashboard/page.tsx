"use client";
import React from "react";
import { Calendar } from "@nextui-org/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

import LineChart from "@/src/components/LineChart";

export default function DashboardPage() {
  return (
    <div className="px-7 py-2 grid grid-cols-2 gap-4">
      <div>
        <Calendar aria-label="Date (No Selection)" />
      </div>
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>STATUS</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>CEO</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Zoey Lang</TableCell>
              <TableCell>Technical Lead</TableCell>
              <TableCell>Paused</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Jane Fisher</TableCell>
              <TableCell>Senior Developer</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>William Howard</TableCell>
              <TableCell>Community Manager</TableCell>
              <TableCell>Vacation</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-full">
        <LineChart />
      </div>
    </div>
  );
}
