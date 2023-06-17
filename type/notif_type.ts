import { TransaksiType } from "./transaksi_type";

export type NotifTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: NotifType[]
};

export type NotifType = {
    id: number;
    datetime: string
    status: string
    transaksi: TransaksiType
   
};