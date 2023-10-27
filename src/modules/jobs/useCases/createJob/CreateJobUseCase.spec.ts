import { CreateJobUseCase } from "./CreateJobUseCase";
import { JobsRepositoryInMemory } from "modules/jobs/repositories/inMemory/JobsRepositpryInMemory";

let createJobUseCase: CreateJobUseCase;
let jobRepositoryInMemory: JobsRepositoryInMemory;
describe("Create job", () => {
    beforeEach(() => {
        jobRepositoryInMemory = new JobsRepositoryInMemory();
        createJobUseCase = new CreateJobUseCase(jobRepositoryInMemory);
    });

    it("Should be able to create a new job", async() => {
        await createJobUseCase.execute({
            vacancy: "test vacancy",
            requirements: "test requirements",
            workload: "test workload",
            location: "test location",
            benefits: "test benefits",
            banner: "test banner",
            resume_candidate: "test resume candidate",
            category_id: "test category id"
        });
    });
})