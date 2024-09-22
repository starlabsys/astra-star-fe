import { useEffect, useState } from "react";

import { getDataHistory } from "@/src/repository/history/historyRepository";
import { ListUUID } from "@/src/model/modelHistory";

const useDashboardService = () => {
  const [listHistory, setListHistory] = useState<ListUUID[] | null>();

  const getListHistory = async () => {
    const resp = await getDataHistory();

    setListHistory(resp?.result.listUUID);
  };

  useEffect(() => {
    //
    getListHistory();
  }, []);

  return {
    listHistory,
  };
};

export default useDashboardService;
