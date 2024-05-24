import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcrypt';
import { Admin } from 'src/admins/admins.entity';
import { Request } from 'express';
import { RequestJwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) { }

    async createUser(user: CreateUserDto) {
        const userFound = await this.userRepository.findOneBy({ email: user.email });
        if (userFound) throw new HttpException('Account exists', HttpStatus.CONFLICT);

        const adminFound = await this.adminRepository.findOneBy({ email: user.email });
        if (adminFound) throw new HttpException('Account exists', HttpStatus.CONFLICT);

        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }

    getUsers() {
        return this.userRepository.find();
    }

    async getUser(request: Request) {
        const dataUser = request.user as RequestJwtPayload;
        const userFound = await this.userRepository.findOneBy({ id: dataUser.userId });
        if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        return userFound.ToJSON();
    }

    async getUserById(id: number) {
        const userFound = await this.userRepository.findOneBy({ id });
        if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return userFound;
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        return new HttpException('User deleted', HttpStatus.OK);
    }

    async updateUser(id: number, user: UpdateUserDto) {
        const result = await this.userRepository.update(id, user);
        if (result.affected === 0) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        const res = await this.userRepository.findOneBy({ id });
        return res;
    }
}
