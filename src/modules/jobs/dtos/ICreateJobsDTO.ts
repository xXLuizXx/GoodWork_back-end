interface ICreateJobsDTO{
    vacancy: string;
    contractor: string;
    description_vacancy: string
    requirements: string;
    workload: string;
    location: string;
    benefits?: string;
    banner: string;
    category_id: string;
    user_id: string;
    amount_vacancy: number;
    closing_date: Date;
}

export { ICreateJobsDTO }