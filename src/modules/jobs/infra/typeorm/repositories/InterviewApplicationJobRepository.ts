import { getRepository, Repository } from "typeorm";
import { Interview } from "../entities/Interviews";
import { ICreateInterviewDTO } from "../../../dtos/ICreateInterviewDTO";
import { IInterviewApplicationJobRepository } from "../../../repositories/IInterviewApplicationJobRepository";

class InterviewApplicationJobReposiory implements IInterviewApplicationJobRepository {
    private repository: Repository<Interview>;
    
    constructor(){
        this.repository = getRepository(Interview);
    }
    async create({ application, interview_type, scheduled_date, duration_minutes, location, meeting_link, interviewer_name, interviewer_email, notes, status }: ICreateInterviewDTO): Promise<void> {
        const interview = this.repository.create({
          application, 
          interview_type, 
          scheduled_date, 
          duration_minutes, 
          location, 
          meeting_link, 
          interviewer_name, 
          interviewer_email, 
          notes, 
          status
        });
      
        await this.repository.save(interview);
    }
}

export { InterviewApplicationJobReposiory }