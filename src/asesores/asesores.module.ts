import { Module } from '@nestjs/common';
import { AsesoresService } from './asesores.service';
import { AsesoresController } from './asesores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asesor } from './asesores.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Asesor])],
  controllers: [AsesoresController],
  providers: [AsesoresService]
})
export class AsesoresModule { }
