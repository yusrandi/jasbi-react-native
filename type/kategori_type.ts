
export type KategoriTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: KategoriType[]
};

export type KategoriType = {
    id: number;
    name: string
};