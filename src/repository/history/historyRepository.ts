import { post } from "@/src/core/api/baseApi";
import { ConvertModelHistory, ModelHistory } from "@/src/model/modelHistory";

export const getDataHistory = async ():Promise<ModelHistory | null> => {
    const resp = await post('/history', {
        limit: 10,
        skip: 0
    });

    if(resp === null){
        return null;
    }

    return ConvertModelHistory.toModelHistory(JSON.stringify(resp));
}