import { KategoriType } from "./kategori_type";

export type ProductTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: ProductType[]
};

export type ProductType = {
        id: number,
      image: string,
      kategoriId: number,
      name: string,
      price: number,
      stock: number,
      unit: string,
      description: string,
      kategori: KategoriType
};