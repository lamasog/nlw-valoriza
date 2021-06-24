import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    password: string;
    email: string;
    // ? indica que o atributo é opcional
    admin?: boolean;
}

class CreateUserService {
    async execute({name, password, email, admin} : IUserRequest) {
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

        const user = usersRepository.create({
            name,
            password,
            email,
            admin
        })

        await usersRepository.save(user);
        return user;
    }
}

export { CreateUserService };