import { Module } from '@nestjs/common';
import { RevisoresService } from './revisores.service';

@Module({
  providers: [RevisoresService]
})
export class RevisoresModule {}
