import { compare, genSalt, hash } from "bcrypt";
import * as jwt from "jsonwebtoken"
import { appConfig } from "../appConfig";
import { Result } from "../types/Result";
const saltRounds = 10;

export const encryptAsync = async (plainText: string): Promise<Result<string>> => {
    if(!plainText || plainText.isEmpty()) 
        return Result.fail<string>("Invalid or missing password");

    try {
        const salt = await genSalt(saltRounds);
        return Result.ok(await hash(plainText, salt));
    }
    catch(err) {
        console.log(err);
        return Result.fail<string>(err);
    }
}

export const validateAsync = async (plainText: string, hashedText: string): Promise<Result>  => {
    if((!plainText && !hashedText) || plainText.isEmpty() || hashedText.isEmpty())
        return Result.fail("Incorrect password");

    try {
        return await compare(plainText, hashedText) ? Result.ok() : Result.fail("Incorrect password")
    }
    catch(err) {
        console.log(err);
        return Result.fail(err);
    }
}

export const getToken = (userId: number) => {
    return jwt.sign({id: userId}, appConfig.jwt.myprivatekey, {expiresIn: 86400 /*24 hours*/})
}

export const validateToken = (token: string) => {
    if(!token || token.isEmpty())
        return false;

    try {
        const res = jwt.verify(token, appConfig.jwt.myprivatekey);
        return true;
    } 
    catch(err){
        console.log(err);
        return false
    }
}

export const decodeToken = (token: string) => {
    return jwt.decode(token, appConfig.jwt.myprivatekey)
}

export const getTempResetToken = (user: string) => {
    return jwt.sign(user, appConfig.jwt.myprivatekey)
}
