import { UserType, UserTypeResponse } from '../type/user_type';
import { storeData } from '../utils/LocalStorage';
import ApiManager from './ApiManager'

export const UpdateUserApi = async (user: UserType, newPassword: string): Promise<UserTypeResponse> => {
    try {
        let updateResponse: UserTypeResponse = {
            responsecode: 0,
            responsemsg: "init",
            responsedata: {
                id: 0,
                name: '',
                address: '',
                phone: '',
                email: '',
                role: '',
                password: '',
            }
        }
        const result = await ApiManager(`/api/user/${user.id}`,{
            method:"PUT",
            headers:{
                'content-type':"application/json"
            },
            data: {
                name: user.name,
                address: user.address,
                phone: user.phone,
                email: user.email,
                role: user.role,
                password: newPassword,
                oldPassword: user.password
            }
        }).then(function (response){
            // console.log(response);
            updateResponse = response.data
            // console.log({updateResponse});

                
            
        }).catch(function (error){
            // console.log({error});
            updateResponse = {
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
        return updateResponse;
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