"use client"; // Ensure this is at the top to mark the file as client-side

import React from 'react';
import DetailTablePkb from './detailTablePkb';
import { useHistoryContext } from '@/src/app/(admin)/history-pkb/HistoryProvider';
import useDetailHistoryService from './detailHistoryService';

const DetailHistoryView = () => {
  const { selectedUuid } = useHistoryContext(); // Get the uuid from context
  const uuid = selectedUuid?.uuid || "";
  const { listDetailHistory } = useDetailHistoryService(uuid); // Pass the uuid to the service

  if (!selectedUuid) {
    return <div>No uuid selected. Please go back and select a package.</div>;
  }

  return (
    <div>
      <DetailTablePkb data={listDetailHistory} />
    </div>
  );
};

export default DetailHistoryView;
