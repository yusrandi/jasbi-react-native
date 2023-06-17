import { UserType, UserTypeResponse } from '../type/user_type';
import { storeData } from '../utils/LocalStorage';
import ApiManager from './ApiManager'

export const RegisterApi = async (user: UserType, password: string): Promise<UserTypeResponse> => {
    try {
        let loginResponse: UserTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: {
                id: 0,
                name: '',
                address: '',
                phone: '',
                email: '',
                role: ''
            }
        }
        const result = await ApiManager("/api/auth/register",{
            method:"POST",
            headers:{
                'content-type':"application/json"
            },
            data: {
                name: user.name,
                address: user.address,
                phone: user.phone,
                email: user.email,
                role: "USER",
                password: password
            }
        }).then(function (response){
            // console.log(response);
            loginResponse = response.data
            // console.log({loginResponse});

                
            
        }).catch(function (error){
            // console.log({error});
            loginResponse = {
                responsecode: 0,
                responsemsg: error,
                responsedata: {
                    id: 0,
                    name: '',
                    address: '',
                    phone: '',
                    email: '',
                    role: ''
                }
            }

        });
        return loginResponse;
    } catch (error) {
        // console.log(`errorApi ${error}`);
        return {
            responsecode: 0,
            responsemsg: "Something Error",
            responsedata: {
                id: 0,
                name: '',
                address: '',
                phone: '',
                email: '',
                role: ''
            }
        }
        // return error.response
    }
}