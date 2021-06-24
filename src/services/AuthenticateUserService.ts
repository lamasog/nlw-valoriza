import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        // Verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if(!user) {
            throw new Error("Email or password incorrect");
        }

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email or password incorrect");
        }

        // Gerar token
        // Segundo parâmetro é um MD5 hash
        const token = sign(
            {
                email: user.email
            }, 
            "7528a6b0833feb683a29d0a845f8225f", 
            {
            subject: user.id,
            expiresIn: "1d"
            }
        );
        
        return token;
    }
}

export { AuthenticateUserService };