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
    ability: string;
    email: string;
    password: string;
    isAdmin?: boolean;
    id?: string;
    avatar?: string;

}

export { ICreateUsersDTO }