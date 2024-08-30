import { User } from './user.model';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: typeof User);
    updateProblemsFlag(): Promise<number>;
}
