import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    password: string;
    email: string;
    // ? indica que o atributo é opcional
    admin?: boolean;
}

class CreateUserService {
    async execute({name, password, email, admin = false} : IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Incorrect email");
        }

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            throw new Error("User already exists");
        }

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            password: passwordHash,
            email,
            admin
        })

        await usersRepository.save(user);
        return user;
    }
}

export { CreateUserService };