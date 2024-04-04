import { Module } from '@nestjs/common';
import { SustentacionesService } from './sustentaciones.service';

@Module({
  providers: [SustentacionesService]
})
export class SustentacionesModule {}
