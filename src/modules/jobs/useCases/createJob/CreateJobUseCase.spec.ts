import { JobsRepositoryInMemory } from "../../../../modules/jobs/repositories/in-memory/JobsRepositoryInMemory";
import { CreateJobUseCase } from "./CreateJobUseCase"; 
import { AppError } from "../../../../shared/errors/AppError";


let createJobUseCase: CreateJobUseCase;
let jobRepositoryInMemory: JobsRepositoryInMemory;

describe("Create job", () => {
    beforeEach(() => {
        jobRepositoryInMemory = new JobsRepositoryInMemory();
        createJobUseCase = new CreateJobUseCase(jobRepositoryInMemory);
    });

    it("Should be able to create a new job", async () => {
        const job = await createJobUseCase.execute({
            vacancy: "test vacancy",
            requirements: "test requirements",
            workload: "test workload",
            location: "test location",
            benefits: "test benefits",
            banner: "test banner",
            resume_candidate: "test resume candidate",
            category_id: "test category id"
        });

        expect(job).toHaveProperty("id");
    });

    it("Verificando se vaga de emprego já existe", () => {
        expect(async () => {
            await createJobUseCase.execute({
                vacancy: "test vacancy exist",
                requirements: "test requirements",
                workload: "test workload",
                location: "test location",
                benefits: "test benefits",
                banner: "test banner",
                resume_candidate: "test resume candidate",
                category_id: "test category id"
            });

            await createJobUseCase.execute({
                vacancy: "test vacancy exist",
                requirements: "test requirements",
                workload: "test workload",
                location: "test location",
                benefits: "test benefits",
                banner: "test banner",
                resume_candidate: "test resume candidate",
                category_id: "test category id"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Criando vaga de emprego com o campo de vaga disponivel prenchido como sim", async () => {
        const job = await createJobUseCase.execute({
            vacancy: "test vacancy avaliable",
            requirements: "test requirements",
            workload: "test workload",
            location: "test location",
            benefits: "test benefits",
            banner: "test banner",
            resume_candidate: "test resume candidate",
            category_id: "test category id"
        });
        console.log(job);
        expect(job.vacancy_available).toBe(true);
    });
})