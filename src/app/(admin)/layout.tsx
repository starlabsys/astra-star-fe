import React from "react";

import NavbarNavigation from "@/src/components/NavbarNavigation";
import SidebarNavigation from "@/src/components/SidebarNavigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    //   <div className="inline-block max-w-lg text-center justify-center">
    //     {children}
    //   </div>
    // </section>
    <section className="flex">
      <SidebarNavigation />
      <div className="w-full">
        <NavbarNavigation />
        {children}
      </div>
    </section>
  );
}
