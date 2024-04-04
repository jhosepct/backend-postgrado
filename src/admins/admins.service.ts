import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admins.entity';
import { Repository } from 'typeorm';
import { UpdateAdminDto } from './dto/update-admin.dto';

import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { User } from 'src/users/users.entity';


@Injectable()
export class AdminsService {
    constructor(
        @InjectRepository(Admin) private adminRepository: Repository<Admin>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createAdmin(admin: CreateAdminDto) {
        const adminFound = await this.adminRepository.findOneBy({ email: admin.email });
        if (adminFound) throw new HttpException('Account exists', HttpStatus.CONFLICT);

        // const userFound = await this.userRepository.findOneBy({ email: admin.email });
        // if (userFound) throw new HttpException('Account exists', HttpStatus.CONFLICT);

        const newPassword = await bcrypt.hash(admin.password, 10);

        const adminObject = { ...admin, password: newPassword }

        const newAdmin = this.adminRepository.create(adminObject);
        return this.adminRepository.save(newAdmin);
    }

    getAdmins(): Promise<Admin[]> {
        return this.adminRepository.find();
    }

    async getAdmin(id: number) {
        const admin = await this.adminRepository.findOneBy({ id });
        if (!admin) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);

        return admin;
    }

    async deleteAdmin(id: number) {
        const result = await this.adminRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);

        throw new HttpException('Admin deleted', HttpStatus.OK);
    }

    async updateAdmin(id: number, admin: UpdateAdminDto) {
        const result = await this.adminRepository.update(id, admin);
        if (result.affected === 0) throw new HttpException('Admin not found', HttpStatus.NOT_FOUND);

        throw new HttpException('Admin updated', HttpStatus.OK);

    }


}
