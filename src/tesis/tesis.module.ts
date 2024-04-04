import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tesis } from './tesis.entity';
import { TesisController } from './tesis.controller';
import { TesisService } from './tesis.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tesis])],
    controllers: [TesisController],
    providers: [TesisService]
})
export class TesisModule {}
