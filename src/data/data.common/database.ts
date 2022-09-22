import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { appConfig } from "../../appConfig";

export class DataBase {

    protected context: Connection;

    constructor(database: string, entities: Array<any>) {
        const connectionOptions = appConfig.data;
        const conOpts = {
            ...connectionOptions,
            entities: entities,
            database: database
        } as ConnectionOptions;

        createConnection(conOpts).then(x => this.context = x).catch(err => console.log(err))


    }
}