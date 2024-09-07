import React from 'react'
import TablePkb from './tablePkb'
import useHistoryService from './historyService';

const HistoryView = () => {
    const { listHistory } = useHistoryService();
  return (
    <div className="w-full flex flex-col px-7 py-2 gap-4">
      <TablePkb />
    </div>
  )
}

export default HistoryView