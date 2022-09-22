import { Service } from "couch-routes/decorators";
import { User } from "../data/main/!typeOrm/entities/user";
import { UserView } from "../data/main/views/user.view";
import { securityEntities } from "../data/security/!typeorm/entities";
import { SecurityUser } from "../data/security/!typeorm/entities/securityUser";
import { SecurityUserView } from "../data/security/views/securityUserView";
import * as auth from "../middlewares/auth";
import { IAuthResponse } from "../types/interfaces/IAuthResposne";
import { IUser } from "../types/interfaces/IUser";
import { Result } from "../types/Result";

@Service()
export class AuthService {

    private user = {
        id: 1,
        email: "test@gmail.com",
        passwordHash: ""
    }

    constructor(private readonly userView: UserView, private readonly securityUserView: SecurityUserView) {}

    public resetPasswordInit(): Result {
        //Get user by email
        //generate reset token
        //send email
            /*
                email should include link with a query param
                that contains the value of the reset token that
                contains the user object as a jwt. 
            */

        //replace with call for user object
        const user = "TEST_USER_STRING";

        return Result.ok(auth.getTempResetToken(user));
    }

    public resetPasswordComplete(userObj: IUser, newPassword) : void {
        //hash password
        //user user id to update passwordHash in db
        //return public user
    }

    public async logIn(email: string, password: string) : Promise<Result> {
        const hash = await auth.encryptAsync("testPassword");
        this.user.passwordHash = hash.isSuccess && hash.value;
        const user = "TEST_USER_STRING";

        const hashResult = await auth.encryptAsync(password);
        if(hashResult.isFailure)
            return Result.fail(hashResult.error);

        const validateResult = await auth.validateAsync(password, hashResult.value);
        if(validateResult.isFailure)
            return Result.fail(validateResult.error);
        
        return Result.ok();
    }

    public async signUp(userObj: User, password: string): Promise<Result<IAuthResponse>> {
        const isDuplicateEmail = await this.userView.doesUserEmailExist(userObj.EmailAddress);

        if(isDuplicateEmail) 
            return Result.fail("Email address is already in use.");

        const userResult = await this.userView.addOrUpdate(userObj);
        if(userResult.isFailure) 
            return Result.fail<IAuthResponse>(userResult.error);

        const passwordHash = await auth.encryptAsync(password);
        if(passwordHash.isFailure)
            return Result.fail<IAuthResponse>(passwordHash.error);

        const secUser: SecurityUser = {
            PasswordHash: passwordHash.value,
            UserId: userResult.value.Id,
            Id: null
        }

        const secUserResult = await this.securityUserView.addOrUpdate(secUser);
        if(secUserResult.isFailure)
            return Result.fail<IAuthResponse>(secUserResult.error);

        const retObj: IAuthResponse = {
            user: userResult.value,
            token: auth.getToken(userResult.value.Id)
        }

        return Result.ok(retObj);
    }
}