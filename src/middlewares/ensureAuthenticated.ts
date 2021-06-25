import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    
    // Receber o token
    const authToken = request.headers.authorization;
    
    // Validar se token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    // A primeira posição do array é ignorada e a segunda posição é armazenada na variável token
    const [,token] = authToken.split(" ");

    try {
        // Validar se token não está expirado | usuário autenticado
        const { sub } = verify(token, "7528a6b0833feb683a29d0a845f8225f") as IPayload;
        
        // Recuperar informações do usuário
        request.user_id = sub;

        return next();
    } catch(err) {
        return response.status(401).end();
    }
    
    
}