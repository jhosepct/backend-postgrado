import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocentesController } from './docentes.controller';
import { DocentesService } from './docentes.service';
import { Docente } from './docentes.entity';
import { LineaInvestigacion } from 'src/lineas-investigacion/lineas-investigacion.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Docente, LineaInvestigacion])],
    controllers: [DocentesController],
    providers: [DocentesService]
})
export class DocentesModule {}
