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
import useDashboardService from "@/src/module/admin/dashboard/dashboardService";
import { ListUUID } from "@/src/model/modelHistory";

export default function DashboardView() {
  const { listHistory } = useDashboardService();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // Use toLocaleString to format the date in Asia/Jakarta timezone
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Jakarta",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    // Format date using toLocaleString
    const formattedDate = date.toLocaleString("id-ID", options);

    return formattedDate.replace(",", ""); // Removes the comma between date and time
  };

  const limitedHistory = (listHistory || []).slice(0, 5);

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
            {(limitedHistory || []).map((item: ListUUID, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.uuid || "Unknown"}</TableCell>
                <TableCell>
                  {item.createdAt ? formatDate(item.createdAt) : "Unknown"}
                </TableCell>
                <TableCell>{`${item.totalDataSuccess} / ${item.totalData}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-full">
        <LineChart />
      </div>
    </div>
  );
}
