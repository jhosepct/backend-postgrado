import { Module } from '@nestjs/common';
import { AsesoresService } from './asesores.service';

@Module({
  providers: [AsesoresService]
})
export class AsesoresModule {}
