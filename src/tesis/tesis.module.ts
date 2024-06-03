import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tesis } from './tesis.entity';
import { Acta } from './acta.entity';
import { TesisController } from './tesis.controller';
import { TesisService } from './tesis.service';
import { User } from 'src/users/users.entity';
import { Document } from 'src/documents/documents.entity';
import { Asesor } from 'src/asesores/asesores.entity';
import { Docente } from 'src/docentes/docentes.entity';
import { Fase } from 'src/fases/fases.entity';
import { Expedito } from 'src/expeditos/expeditos.entity';
import { Revisor } from 'src/revisores/revisores.entity';
import { TesisToRevisores } from 'src/revisores/tesisToRevisores.entity';
import { Sustentacion } from 'src/sustentaciones/sustentaciones.entity';
import { Intento } from 'src/intentos/intentos.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tesis, User, Expedito, Document,Acta, Asesor, Docente, Fase,Revisor, TesisToRevisores, Sustentacion, Intento])],
    controllers: [TesisController],
    providers: [TesisService]
})
export class TesisModule {}
