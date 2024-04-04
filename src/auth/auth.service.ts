import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admins/admins.entity';
import { Response } from 'express';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,

        private jwtService: JwtService
    ) { }

    async login(userObject: LoginDto, res: Response) {
        const userFound =  await this.adminRepository.findOneBy({ email: userObject.email });
        if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

        const isMatch = await bcrypt.compare(userObject.password, userFound.password);
        if (!isMatch) throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);

        const payload = { id: userFound.id, email: userFound.email, role: userFound.role }
        const token = this.jwtService.sign(payload);

        // const serialized = serialize('access_token', token, {})

        res.cookie('user_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 1,
            path: '/',
        });
        throw new HttpException(userFound.ToJSON(), HttpStatus.OK)
    }

    async validateUser(payload: any) {
        const user = await this.userRepository.findOneBy({ id: payload.id }) || await this.adminRepository.findOneBy({ id: payload.id });
        if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        return user;
    }

    async logout(res: Response) {
        res.clearCookie('user_token');
        throw new HttpException('Logout success', HttpStatus.OK);
    }
}
