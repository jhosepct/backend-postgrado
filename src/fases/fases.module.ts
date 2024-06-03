import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fase } from './fases.entity';
import { FasesController } from './fases.controller';
import { FasesService } from './fases.service';

@Module({
    imports: [TypeOrmModule.forFeature([Fase])],
    controllers: [FasesController],
    providers: [FasesService]
})
export class FasesModule {}
