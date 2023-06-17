import { KategoriTypeResponse } from '../type/kategori_type';
import { ProductTypeResponse } from '../type/product_type';
import ApiManager from './ApiManager'
import axios from 'axios'

export async function ProductApi(): Promise<ProductTypeResponse>{
    try {
        let responseProduct: ProductTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/product')
            .then(function (response) {
                responseProduct = response.data
                // console.log({responseProduct});
            })
            .catch(function (error) {
                responseProduct =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(responseProduct);

            })
            return responseProduct
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}