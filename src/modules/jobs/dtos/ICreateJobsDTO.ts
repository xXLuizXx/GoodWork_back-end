interface ICreateJobsDTO{
    vacancy: string;
    requirements: string;
    workload: string;
    location: string;
    benefits?: string;
    banner: string;
    category_id: string;
    valid_vacancy: boolean;
}

export { ICreateJobsDTO }