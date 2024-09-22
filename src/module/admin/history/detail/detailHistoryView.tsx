"use client"; // Ensure this is at the top to mark the file as client-side

import React from "react";
import { usePathname } from "next/navigation";

import DetailTablePkb from "./detailTablePkb";
import useDetailHistoryService from "./detailHistoryService";

const DetailHistoryView = () => {
  // const { selectedUuid } = useHistoryContext(); // Get the [uuid] from context
  // const uuid = selectedUuid?.uuid || "";

  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "";
  const { listDetailHistory } = useDetailHistoryService(slug); // Pass the [uuid] to the service

  if (!slug) {
    return <div>No uuid selected. Please go back and select a package.</div>;
  }

  return (
    <div>
      <DetailTablePkb data={listDetailHistory} uuid={slug} />
    </div>
  );
};

export default DetailHistoryView;
