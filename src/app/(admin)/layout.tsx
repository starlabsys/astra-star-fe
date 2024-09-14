import React from "react";

import { HistoryProvider } from "./history-pkb/HistoryProvider";

import NavbarNavigation from "@/src/components/NavbarNavigation";
import SidebarNavigation from "@/src/components/SidebarNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HistoryProvider>
      <section className="flex">
        <SidebarNavigation />
        <div className="w-full">
          <NavbarNavigation />
          {children}
        </div>
      </section>
    </HistoryProvider>
  );
}
