import { ISendMailDTO } from "../../dtos/ISendMailDTO";

interface ISendMailUseCase {
    execute(data: ISendMailDTO): Promise<void>;
}

export { ISendMailUseCase };