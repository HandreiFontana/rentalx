import { CategoriesRepository } from "../../repositories/implementations/CategoriesRespository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default (): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository();
    console.log("TESTE");

    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

    const createCategoryController = new CreateCategoryController(createCategoryUseCase);

    return createCategoryController;
}


