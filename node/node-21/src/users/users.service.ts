import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userModel: typeof User) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userModel.create(createUserDto);
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    findUserById(id: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                id,
            },
        });
    }

    findOneByEmail(email: string): Promise<User> {
        return this.userModel.findOne({
            where: {
                email,
            },
        });
    }

    async remove(id: string): Promise<void> {
        const user = await this.findUserById(id);
        await user.destroy();
    }
}
