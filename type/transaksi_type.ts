import { ProductType } from "./product_type";
import { UserType } from "./user_type";

export type TransaksiTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: TransaksiType[]
};

export type TransaksiType = {
    id: number,
    datetime: string ,
    transaksiCode: string,
    customerId: number,
    customer: UserType,
    productId: number,
    product: ProductType,
    qty: number,
    total: number,
    file: string,
    status: string
};