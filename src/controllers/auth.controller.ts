import { Controller, Get, Post } from "couch-routes/decorators";
import { Request, RequestParamHandler, Response } from "express";
import { User } from "../data/main/!typeOrm/entities/user";
import { AuthService } from "../services/auth.service";
import { IUser } from "../types/interfaces/IUser";
import { Result } from "../types/Result";


@Controller("/Security")
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    public async login(req: Request, res: Response): Promise<void> {
        const userName: string = req.body.email;
        const plainTextPassword: string = req.body.password;

        if(!userName || userName.isEmpty() || !plainTextPassword || plainTextPassword.isEmpty()) {
            res.send(Result.fail<IUser>("username or password missing or invalid"));
            return;
        }
        
        res.send(await this.authService.logIn(userName, plainTextPassword));
    }

    @Post("/register")
    public async register(req: Request, res: Response) : Promise<void> {
        console.log(req.body)
        res.send()
        // const user: User = JSON.parse(req.body.user);
        // const password: string = req.body.password;

        // const result = await this.authService.signUp(user, password);
        // res.send(result);
    }
}