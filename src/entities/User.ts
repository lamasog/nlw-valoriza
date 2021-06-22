import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
// a v4 gera números totalmente aleatórios
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @PrimaryColumn()
    // A alteração desse valor só é feita pela própria entidade com a biblioteca uuid
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        // Criar uuid para novos usuários
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { User };