import { post } from "@/src/core/api/baseApi";
import { ConvertModelHistory } from "@/src/model/modelHistory";

export const getDataHistory = async ():Promise<any> => {
    const resp = await post('/history', {
        limit: 10,
        skip: 0
    });

    console.log('Response History Repository', resp);

    if(resp === null){
        return null;
    }

    return ConvertModelHistory.toModelHistory(JSON.stringify(resp));
}