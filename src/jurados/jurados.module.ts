import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jurado } from './jurados.entity';
import { JuradosController } from './jurados.controller';
import { JuradosService } from './jurados.service';

@Module({
    imports: [TypeOrmModule.forFeature([Jurado])],
    controllers: [JuradosController],
    providers: [JuradosService]
})
export class JuradosModule {}
