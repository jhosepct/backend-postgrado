import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admins.entity';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { User } from 'src/users/users.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Admin, User])],
    controllers: [AdminsController],
    providers: [AdminsService]
})
export class AdminsModule { }
