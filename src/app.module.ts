import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { environments } from './config/environments';

import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config/configuration';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/admins.entity';
import { TesisController } from './tesis/tesis.controller';
import { TesisService } from './tesis/tesis.service';
import { TesisModule } from './tesis/tesis.module';
import { DocumentsController } from './documents/documents.controller';
import { DocumentsService } from './documents/documents.service';
import { DocumentsModule } from './documents/documents.module';
import { FasesController } from './fases/fases.controller';
import { FasesService } from './fases/fases.service';
import { FasesModule } from './fases/fases.module';
import { JuradosController } from './jurados/jurados.controller';
import { JuradosService } from './jurados/jurados.service';
import { JuradosModule } from './jurados/jurados.module';
import { DocentesController } from './docentes/docentes.controller';
import { DocentesService } from './docentes/docentes.service';
import { DocentesModule } from './docentes/docentes.module';
import { LineasInvestigacionController } from './lineas-investigacion/lineas-investigacion.controller';
import { LineasInvestigacionService } from './lineas-investigacion/lineas-investigacion.service';
import { LineasInvestigacionModule } from './lineas-investigacion/lineas-investigacion.module';
import { PeriodosController } from './periodos/periodos.controller';
import { PeriodosModule } from './periodos/periodos.module';
import { AsesoresController } from './asesores/asesores.controller';
import { AsesoresModule } from './asesores/asesores.module';
import { RevisoresController } from './revisores/revisores.controller';
import { RevisoresModule } from './revisores/revisores.module';
import { ExpeditosController } from './expeditos/expeditos.controller';
import { ExpeditosModule } from './expeditos/expeditos.module';
import { IntentosController } from './intentos/intentos.controller';
import { IntentosService } from './intentos/intentos.service';
import { IntentosModule } from './intentos/intentos.module';
import { SustentacionesController } from './sustentaciones/sustentaciones.controller';
import { SustentacionesModule } from './sustentaciones/sustentaciones.module';
import { Tesis } from './tesis/tesis.entity';
import { Document } from './documents/documents.entity';
import { Fase } from './fases/fases.entity';
import { Jurado } from './jurados/jurados.entity';
import { Acta } from './tesis/acta.entity';
import { Docente } from './docentes/docentes.entity';
import { LineaInvestigacion } from './lineas-investigacion/lineas-investigacion.entity';
import { Periodo } from './periodos/periodos.entity';
import { Asesor } from './asesores/asesores.entity';
import { Revisor } from './revisores/revisores.entity';
import { TesisToRevisores } from './revisores/tesisToRevisores.entity';
import { Expedito } from './expeditos/expeditos.entity';
import { Intento } from './intentos/intentos.entity';
import { Sustentacion } from './sustentaciones/sustentaciones.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        type: 'postgres',
        url: configService.DATABASE_URL_LOCAL,
        entities: [Admin, User, Acta, Tesis, Document, Fase, Jurado, Docente, LineaInvestigacion, Periodo, Asesor, Revisor, Expedito, Intento, Sustentacion, TesisToRevisores],
        synchronize: true,
        logging: true,
      })
    }),
    AuthModule,
    AdminsModule,
    UsersModule,
    TesisModule,
    DocumentsModule,
    FasesModule,
    JuradosModule,
    DocentesModule,
    LineasInvestigacionModule,
    PeriodosModule,
    AsesoresModule,
    RevisoresModule,
    ExpeditosModule,
    FasesModule,
    IntentosModule,
    SustentacionesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
