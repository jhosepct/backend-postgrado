import { Module } from '@nestjs/common';
import { PeriodosService } from './periodos.service';

@Module({
  providers: [PeriodosService]
})
export class PeriodosModule {}
