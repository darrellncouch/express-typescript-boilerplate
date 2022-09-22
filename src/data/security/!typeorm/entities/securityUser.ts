import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SecurityUser {
    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    UserId: number;
    @Column()
    PasswordHash: string;
}