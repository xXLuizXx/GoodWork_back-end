interface IDataUsersDTO {
    id?: string;
    name: string;
    email: string;
    telephone: string;
    avatar?: string;
    road: string;
    number: string;
    neighborhood: string;
    user_type: "individual" | "company";
    functionn?: string;
    ability?: string;
    is_employee?: boolean;
    curriculum?: string;
    business_area?: string;
    categories_interest?: string;
  }
  
export { IDataUsersDTO }