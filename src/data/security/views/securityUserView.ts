import { SecurityUser } from "../!typeorm/entities/securityUser";
import { SecurityContext } from "../!typeorm/securityContext";
import { Result } from "../../../types/Result";

export class SecurityUserView extends SecurityContext {

    constructor(){
        super()
    }

    public async getSecurityUserById(id: number) : Promise<Result<SecurityUser>> {
        try {
            return Result.ok(await this.context.getRepository(SecurityUser).findOne({Id: id}))
        }
        catch(err) {
            return Result.fail<SecurityUser>(err);
        }
    }

    public async addOrUpdate(securityUser: SecurityUser): Promise<Result<SecurityUser>> {
        try{
            const result = await this.context.getRepository(SecurityUser).save(securityUser);
            return Result.ok(result);
        }
        catch(err) {
            return Result.fail<SecurityUser>(err);
        }
    }
}