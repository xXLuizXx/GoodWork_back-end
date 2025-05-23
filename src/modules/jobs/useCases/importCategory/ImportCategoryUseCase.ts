import { parse } from "csv-parse";
import fs from "fs";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "../../infra/typeorm/repositories/CategoriesRepository";

interface IImportCategory {
    name: string,
    description: string;
}

@injectable()
class ImportCategoryUseCase{
    constructor(@inject(CategoriesRepository) private categoriesRepository: ICategoriesRepository){}
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) =>{
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();
            const categories: IImportCategory[] = [];
    
            stream.pipe(parseFile);
            parseFile.on("data", async (line)=>{
                const [name, description] = line;
                categories.push({name, description});
            }).on("end", () => {
                fs.promises.unlink(file.path);
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        });
        
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) =>{
            const {name, description} = category;
            const existCategory = await this.categoriesRepository.findByName(name);

            if(!existCategory){
                await this.categoriesRepository.create({
                    name, 
                    description
                });
            }
        });
    }

}

export { ImportCategoryUseCase }