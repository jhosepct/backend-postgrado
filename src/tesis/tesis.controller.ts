import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tesis } from './tesis.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { CreateFaseUnoDto } from './dto/create-fase-uno.dto';

@Controller('tesis')
export class TesisController {
    constructor(private tesisService: TesisService) { }

    @Post()
    @ApiOperation({ summary: 'Crear primera fase' })
    @ApiResponse({ status: 201, description: 'Fase uno creada', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createJurado(@Body() newFase: CreateFaseUnoDto) {
        return this.tesisService.createFaseUno(newFase);
    }

}
