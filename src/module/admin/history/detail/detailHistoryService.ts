"use client";
import { ListDatum } from "@/src/model/modelDetailHistory";
import { getDataDetailHistory } from "@/src/repository/history/historyRepository";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";

const useDetailHistoryService = (uuid: string) => {
    const [listDetailHistory, setListDetailHistory] = useState<ListDatum[]>([]);
    const {isOpen, onOpen, onClose} = useDisclosure()


    const fetchDetailHistory = async (uuid: string) => {
        const resp = await getDataDetailHistory(uuid);

        if (resp === null) {
            return null;
        }

        setListDetailHistory(resp.result.listData ?? []); // Use nullish coalescing to default to an empty array
    };

    useEffect(() => {
        fetchDetailHistory(uuid); // Replace 'uuid' with the actual UUID
    }, []); // Include 'uuid' in the dependency array

    console.log("List Detail History: ", listDetailHistory);

    return {
        listDetailHistory,
        isOpen,
        onOpen,
        onClose
    };
};

export default useDetailHistoryService;