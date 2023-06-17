

import { TransaksiTypeResponse } from '../type/transaksi_type'
import ApiManager from './ApiManager'
import axios from 'axios'

export async function TransaksiDeleteApi(id: string): Promise<TransaksiTypeResponse>{
    try {
        let dataResponse: TransaksiTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/transaksi/${id}`, {
            headers: {
                'Cache-Control': 'no-cache',
                'Content-Type': 'application/json'

            },
            method: 'DELETE'
        })
            .then(function (response) {
                dataResponse = response.data
                console.log(dataResponse);
            })
            .catch(function (error) {
                dataResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                console.log(dataResponse);

            })
            console.log({result});
            
            return dataResponse
    } catch (error: any) {
    console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}