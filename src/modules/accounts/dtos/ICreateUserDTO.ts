interface ICreateUsersDTO {
    id?: string;
    name: string;
    email: string;
    password: string;
    telephone: string;
    avatar?: string;
    road: string;
    number: string;
    neighborhood: string;
    identifier: string;
    user_type: "individual" | "company";
    sex?: string;
    functionn?: string;
    ability?: string;
    is_employee?: boolean;
    curriculum?: string;
    business_area?: string;
  }
  
export { ICreateUsersDTO }