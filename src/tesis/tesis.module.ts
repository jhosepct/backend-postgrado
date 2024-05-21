import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tesis } from './tesis.entity';
import { TesisController } from './tesis.controller';
import { TesisService } from './tesis.service';
import { User } from 'src/users/users.entity';
import { Document } from 'src/documents/documents.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tesis, User, Document])],
    controllers: [TesisController],
    providers: [TesisService]
})
export class TesisModule {}
