import { ListUUID } from "@/src/model/modelHistory";
import { getDataHistory } from "@/src/repository/history/historyRepository";
import { useEffect, useState } from "react";

const useHistoryService = () => {
    const [listHistory, setListHistory] = useState<ListUUID[] | null>();

    const getListHistory = async () => {
        const resp = await getDataHistory();
        setListHistory(resp?.result.listUUID);
    };

    useEffect(() => {
        console.log('useEffect Trigger');
        getListHistory();
    }, []); 
    // Only run once after the component is mounted


    return {
        listHistory,
    };
};

export default useHistoryService;
