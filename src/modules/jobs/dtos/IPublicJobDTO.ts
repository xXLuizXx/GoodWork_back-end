interface IPublicJobDTO {
    id: string;
    vacancy: string;
    contractor: string;
    description_vacancy: string;
    requirements: string;
    workload: string;
    location: string;
    benefits: string;
    banner: string;
    amount_vacancy: number;
    closing_date: Date;
    created_at: Date;
    vacancy_available: boolean;
    valid_vacancy: boolean | null;
    category: {
        id: string;
        name: string;
        description: string;
    } | null;
    company: {
        id: string;
        name: string;
        avatar: string | null;
        business_area: string;
    } | null;
}

export type { IPublicJobDTO };
