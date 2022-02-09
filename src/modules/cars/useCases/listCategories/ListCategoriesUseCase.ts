import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/infra/typeorm/entities/category';

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]>{
        const categories = await this.categoriesRepository.list()

        return categories;
    }

}

export { ListCategoriesUseCase }