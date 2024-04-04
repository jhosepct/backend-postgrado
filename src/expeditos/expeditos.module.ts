import { Module } from '@nestjs/common';
import { ExpeditosService } from './expeditos.service';

@Module({
  providers: [ExpeditosService]
})
export class ExpeditosModule {}
