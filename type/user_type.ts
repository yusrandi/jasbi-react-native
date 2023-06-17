
export type UserTypeResponse = {
    responsecode: number
    responsemsg: string
    responsedata: UserType
};

export type UserType = {
    id: number;
    name: string
    address: string
    phone: string
    email: string
    role: string
    password?: string
};