import { v4 as uuidV4 } from "uuid"
import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity("Users")
class User {

    @PrimaryColumn()
    id: string;

    @PrimaryColumn()
    name: string;

    @PrimaryColumn()
    username: string;

    @PrimaryColumn()
    email: string;

    @PrimaryColumn()
    sword: string;

    @PrimaryColumn()
    driver_license: string;

    @PrimaryColumn()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User }