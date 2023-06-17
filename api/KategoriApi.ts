import { KategoriTypeResponse } from '../type/kategori_type';
import ApiManager from './ApiManager'
import axios from 'axios'

export async function KategoriApi(): Promise<KategoriTypeResponse>{
    try {
        let kategoriResponse: KategoriTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager('/api/kategori')
            .then(function (response) {
                kategoriResponse = response.data
                // console.log(kategoriResponse);
            })
            .catch(function (error) {
                kategoriResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(kategoriResponse);

            })
            return kategoriResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}