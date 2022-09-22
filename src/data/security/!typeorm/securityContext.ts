import { Database } from "../../../types/enums/Database";
import { DataBase } from "../../data.common/database";
import { securityEntities } from "./entities";

export class SecurityContext extends DataBase {

    constructor() {
        super(Database.Security, securityEntities)
    }
}