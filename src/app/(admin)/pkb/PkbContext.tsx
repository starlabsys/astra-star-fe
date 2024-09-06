import React, { createContext, useContext, useState, ReactNode } from "react";

import { PkbData } from "@/src/module/admin/pkb/pkbService";

interface PkbContextType {
  importExcel: PkbData[];
  setImportExcel: React.Dispatch<React.SetStateAction<PkbData[]>>;
}

const PkbContext = createContext<PkbContextType | undefined>(undefined);

export const PkbProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [importExcel, setImportExcel] = useState<PkbData[]>([]);

  return (
    <PkbContext.Provider value={{ importExcel, setImportExcel }}>
      {children}
    </PkbContext.Provider>
  );
};

export const usePkbContext = () => {
  const context = useContext(PkbContext);

  if (!context) {
    throw new Error("usePkbContext must be used within a PkbProvider");
  }

  return context;
};
