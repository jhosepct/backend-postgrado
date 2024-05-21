import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineaInvestigacion } from './lineas-investigacion.entity';
import { LineasInvestigacionController } from './lineas-investigacion.controller';
import { LineasInvestigacionService } from './lineas-investigacion.service';

@Module({
    imports: [TypeOrmModule.forFeature([LineaInvestigacion])],
  controllers: [LineasInvestigacionController],
  providers: [LineasInvestigacionService]
})
export class LineasInvestigacionModule {}
