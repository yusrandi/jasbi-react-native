import { TransaksiType, TransaksiTypeResponse } from '../type/transaksi_type';
import { UserTypeResponse } from '../type/user_type';
import { storeData } from '../utils/LocalStorage';
import ApiManager from './ApiManager'

export const KeranjangApi = async (transaksi: TransaksiType): Promise<TransaksiTypeResponse> => {
    try {
        let dataResponse: TransaksiTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: []
        }

        const result = await ApiManager("/api/transaksi",{
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                imageName: transaksi.file,
                myImage: "",
                status: transaksi.status,
                qty: transaksi.qty,
                total: transaksi.total,
                customerId: transaksi.customerId,
                productId: transaksi.productId,
                id: transaksi.id,
            }
        }).then(function (response){
            // console.log(response);
            dataResponse = response.data
            // console.log({loginResponse});

                
            
        }).catch(function (error){
            // console.log({error});
            dataResponse = {
                responsecode: 0,
                responsemsg: error,
                responsedata:[]
            }

        });
        return dataResponse;
    } catch (error) {
        // console.log(`errorApi ${error}`);
        return {
            responsecode: 0,
            responsemsg: "Something Error",
            responsedata: []
        }
        // return error.response
    }
}