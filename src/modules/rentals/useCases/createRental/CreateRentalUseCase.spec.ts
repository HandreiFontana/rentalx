import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppErrors";
import { CreateRentalUseCase } from "./CreateRentalUseCase";


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepoitoryInMemory: RentalsRepositoryInMemory;

describe("Create rental", () => {
    beforeEach(() => {
        rentalsRepoitoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepoitoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "user",
            car_id: "car",
            expected_return_date: new(Date),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "test",
                car_id: "car1",
                expected_return_date: new(Date),
            });
    
            await createRentalUseCase.execute({
                user_id: "test",
                car_id: "car2",
                expected_return_date: new(Date),
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user1",
                car_id: "test",
                expected_return_date: new(Date),
            });
    
            await createRentalUseCase.execute({
                user_id: "user2",
                car_id: "test",
                expected_return_date: new(Date),
            });
        }).rejects.toBeInstanceOf(AppError);

    });
});