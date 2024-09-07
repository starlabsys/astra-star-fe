import { getDataHistory } from "@/src/repository/history/historyRepository";
import { useEffect, useState } from "react";

const useHistoryService = () => {
    const [listHistory, setListHistory] = useState<any>([]);

    const getListHistory = async () => {
        const resp = await getDataHistory();
        console.log("Response Service", resp);
        setListHistory(resp);
    }

    useEffect(() => {
        getListHistory();
    },[
        listHistory
    ]);

    // console.log("List History", listHistory);

    return {
        listHistory,
    }
}

export default useHistoryService;