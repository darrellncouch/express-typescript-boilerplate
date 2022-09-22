import { ConnectionOptions } from "typeorm";

export interface IJWTKeys {
    myprivatekey: string;
    myprivatekey2: string;
    postmanKey: string;
}

export interface IAppConfig {
    jwt: IJWTKeys,
    data: ConnectionOptions
}