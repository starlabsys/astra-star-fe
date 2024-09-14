"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface UuidType {
  uuid: string;
  createdAt: string;
  totalData: number;
  totalDataSuccess: number;
}

interface UuidContextType {
  selectedUuid: UuidType | null;
  setSelectedUuid: (uuid: UuidType) => void;
}

const HistoryContext = createContext<UuidContextType | undefined>(undefined);

export const useHistoryContext = (): UuidContextType => {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistoryContext must be used within a HistoryProvider");
  }

  return context;
};

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider: React.FC<HistoryProviderProps> = ({
  children,
}) => {
  const [selectedUuid, setSelectedUuid] = useState<UuidType | null>(null);

  React.useEffect(() => {}, [selectedUuid]); // Update log whenever selectedUuid changes

  return (
    <HistoryContext.Provider value={{ selectedUuid, setSelectedUuid }}>
      {children}
    </HistoryContext.Provider>
  );
};
