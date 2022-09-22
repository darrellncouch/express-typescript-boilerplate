import { Database } from "../../../types/enums/Database";
import { DataBase } from "../../data.common/database";
import { mainEntites } from "./entities";

export class MainContext extends DataBase {

    constructor() {
        super(Database.Main, mainEntites); 
    }
}