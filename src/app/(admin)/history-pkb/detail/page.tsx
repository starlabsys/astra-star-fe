// Ensure this file is a client component
"use client";
import React from "react";

import DetailHistoryView from "@/src/module/admin/history/detail/detailHistoryView";

const Page = () => {
  // Ensure that uuid is a string before passing it to DetailHistoryView
  return (
    <div>
      <DetailHistoryView />
    </div>
  );
};

export default Page;
