export interface ModelDetailHistory {
    errorCode: string;
    message: string;
    result: ResultListData;
}

export interface ResultListData {
    listData: ListDatum[] | null; // Allow listData to be null or an array
}

export interface ListDatum {
    id: string;
    alamat: string;
    provinsi: string;
    kota: string;
    kecamatan: string;
    kelurahan: string;
    kodePos: string;
    rt: string;
    rw: string;
    typeComingCustomer: string;
    alasanKeAhass: string;
    hsoIdPenerima: string;
    namaPenerima: string;
    customerId: string;
    status: string;
    dealerId: string;
    statusData: string;
    namaDealer: string;
    kmAkhirMotor: number;
    platNumber: string;
    nomorMesin: string;
    nomorRangka: string;
    typeMotor: string;
    tahunMotor: number;
    kondisiBensin: number;
    noKTP: string;
    namaStnk: string;
    noHP: string;
    namaPemilik: string;
    saranMekanik: string;
    tglBeli: string;
    nomorAntrian: string;
    customerNo: string;
    createdAt: string;
    description: string;
}


export class ConvertDetailModelHistory {
    public static toModelDetailHistory(json: string): ModelDetailHistory {
        const parsedData = JSON.parse(json) as ModelDetailHistory;

        // Additional checks to ensure data integrity
        if (
            parsedData.result &&
            (Array.isArray(parsedData.result.listData) || parsedData.result.listData === null)
        ) {
            return parsedData;
        } else {
            throw new Error("Invalid data format: 'listData' must be an array or null.");
        }
    }

    public static modelDetailHistoryToJson(value: ModelDetailHistory): string {
        return JSON.stringify(value);
    }
}
