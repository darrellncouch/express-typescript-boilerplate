import { Service } from "couch-routes/decorators";
import { User } from "../!typeOrm/entities/user";
import { MainContext } from "../!typeOrm/mainContext";
import { Result } from "../../../types/Result";

@Service()
export class UserView extends MainContext {

    constructor() {
        super()
    }

    public async getUserById(id: number): Promise<Result<User>> {
        try{
            const result = await this.context.getRepository(User).findOne({Id: id}) 
            return Result.ok(result);
        }
        catch(err) {
            return Result.fail<User>(err);
        }
    }

    public async doesUserEmailExist(email: string): Promise<boolean> {
        try{
            await this.context.getRepository(User).findOneOrFail({EmailAddress: email.toLowerCase().removeWhiteSpace()});
            return true;
        }
        catch(err) {
            console.log(err)
            return false;
        }
    }

    public async addOrUpdate(user: User): Promise<Result<User>> {
        try{
            const saveResult = await this.context.getRepository(User).save(user);
            return Result.ok(saveResult);
        }
        catch(err) {
            return Result.fail<User>(err);
        }
    }
}