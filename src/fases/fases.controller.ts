import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { FasesService } from './fases.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Fase } from './fases.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';

@ApiBearerAuth()
@ApiTags('fases')
@Controller('fases')
export class FasesController {
    constructor(private fasesService: FasesService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo fase' })
    @ApiResponse({ status: 201, description: 'El fase ha sido creado exitosamente', type: Fase })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createFase(@Body() newFase: Fase) {
        return this.fasesService.createFase(newFase);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los fases' })
    @ApiResponse({ status: 200, description: 'Lista de fases', type: [Fase] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getFases(): Promise<Fase[]> {
        return this.fasesService.getFases();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener el perfil del fase por su ID' })
    @ApiResponse({ status: 200, description: 'Perfil del fase', type: Fase })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getFase(@Param('id', ParseIntPipe) id: number ) {
        return this.fasesService.getFase(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un fase por su ID' })
    @ApiResponse({ status: 200, description: 'El fase ha sido eliminado exitosamente' })
    deleteFase(@Param('id', ParseIntPipe) id: number) {
        return this.fasesService.deleteFase(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un fase por su ID' })
    @ApiResponse({ status: 200, description: 'El fase ha sido actualizado exitosamente', type: Fase })
    updateFase(@Param('id', ParseIntPipe) id: number, @Body() fase: Fase) {
        return this.fasesService.updateFase(id, fase);
    }
}
