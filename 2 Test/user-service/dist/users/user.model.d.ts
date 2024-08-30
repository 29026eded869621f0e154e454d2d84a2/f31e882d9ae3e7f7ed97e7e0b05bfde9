import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    problems: boolean;
}
