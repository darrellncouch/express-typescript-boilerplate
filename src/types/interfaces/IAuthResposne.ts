import { User } from "../../data/main/!typeOrm/entities/user";

export interface IAuthResponse {
    user: User,
    token: string
}