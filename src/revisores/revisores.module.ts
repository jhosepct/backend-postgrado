import { Module } from '@nestjs/common';
import { RevisoresService } from './revisores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revisor } from './revisores.entity';
import { RevisoresController } from './revisores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Revisor])],
  controllers: [RevisoresController],
  providers: [RevisoresService]
})
export class RevisoresModule {}
