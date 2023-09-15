interface ICreateUsersDTO{

    name: string;
    road: string;
    number: string;
    identifier: string;
    neighborhood: string;
    sex: string;
    telephone: string;
    is_employee: string;
    functionn: string;
    email: string;
    password: string;
    access_type: string;
    id?: string;
    avatar?: string;

}

export { ICreateUsersDTO }