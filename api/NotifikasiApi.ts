
import { NotifTypeResponse } from '../type/notif_type'
import ApiManager from './ApiManager'
import axios from 'axios'

export async function NotifikasiApi(idCustomer: number): Promise<NotifTypeResponse>{
    try {
        let dataResponse: NotifTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager(`/api/notifikasi/${idCustomer}`)
            .then(function (response) {
                dataResponse = response.data
                // console.log(kategoriResponse);
            })
            .catch(function (error) {
                dataResponse =  {
                    responsecode: 0,
                    responsemsg: error.toString(),
                    responsedata: []
                }
                // console.log(kategoriResponse);

            })
            return dataResponse
    } catch (error: any) {
    // console.log(`error ${error}`);
        return {
            responsecode: 0,
            responsemsg: error.toString(),
            responsedata: []
        }
    }
}