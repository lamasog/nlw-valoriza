import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Exclude } from "class-transformer";
// a v4 gera números totalmente aleatórios
import { v4 as uuid } from "uuid";

@Entity("users")
class User {

    @Exclude()
    @PrimaryColumn()
    // A alteração desse valor só é feita pela própria entidade com a biblioteca uuid
    readonly id: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    admin: boolean;

    @Exclude()
    @CreateDateColumn()
    created_at: Date;

    @Exclude()
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