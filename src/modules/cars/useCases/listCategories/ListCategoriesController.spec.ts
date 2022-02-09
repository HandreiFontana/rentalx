import request from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("List Categories Controller", () => {

    beforeAll(async () => {
        try{
            connection = await createConnection();
            await connection.runMigrations();


            const id = uuidv4();
            const password = await hash("admin", 8);

            await connection.query(
                `
                    INSERT INTO USERS( id, name, email, password, "isAdmin", created_at, driver_license )
                    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXX')
                `
            );
        } catch(err) {
            console.log(">>>>>>>>1", err);
        };
    })

    afterAll(async () => {
        try {
            // await connection.dropDatabase();
            // await connection.close();
        } catch(err) {
            console.log(">>>>>>>>2", err);
        };
    })

    it("should be able to list all categories", async () => {
        try{
            const responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@rentx.com.br",
                password: "admin",
            })

            const { token } = responseToken.body

        
            const response = await request(app)
            .post("/categories")
            .send({
                name: "Category Supertest1",
                description: "Category Supertest",
            })
            .set({
                Authorization: `Bearer ${token}`,
            });

            expect(response.status).toBe(201);

            const response2 = await request(app).get("/categories");

            console.log(response2.body);

            expect(response2.status).toBe(200);
            // expect(response2.body.length).toBe(1);
            
        } catch(err) {
            console.log(">>>>>>>>3", err);
        };
        
    });
});