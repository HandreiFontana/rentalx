import { Specification } from "../model/specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "./ISpecificationRepository";


class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({ description, name }: ICreateSpecificationDTO) {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            created_at: new Date(),
        });

        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(specification => specification.name === name)
        return specification;
    }
}

export { SpecificationsRepository }