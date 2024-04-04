import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JuradosService } from './jurados.service';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Jurado } from './jurados.entity';

import { Request as Req } from 'express';
import { CreateJuradoDto } from './dto/create-jurado.dto';
import { UpdateJuradoDto } from './dto/update-jurado.dto';

@ApiBearerAuth()
@ApiTags('jurados')
@Controller('jurados')
export class JuradosController {
    constructor(private juradosService: JuradosService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo jurado' })
    @ApiResponse({ status: 201, description: 'El jurado ha sido creado exitosamente', type: Jurado })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createJurado(@Body() newJurado: CreateJuradoDto) {
        return this.juradosService.createJurado(newJurado);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los jurados' })
    @ApiResponse({ status: 200, description: 'Lista de jurados', type: [Jurado] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getJurados(): Promise<Jurado[]> {
        return this.juradosService.getJurados();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener el perfil del jurado por su ID' })
    @ApiResponse({ status: 200, description: 'Perfil del jurado', type: Jurado })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getJurado(@Param('id', ParseIntPipe) id: number ) {
        return this.juradosService.getJurado(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un jurado por su ID' })
    @ApiResponse({ status: 200, description: 'El jurado ha sido eliminado exitosamente' })
    deleteJurado(@Param('id', ParseIntPipe) id: number) {
        return this.juradosService.deleteJurado(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un jurado por su ID' })
    @ApiResponse({ status: 200, description: 'El jurado ha sido actualizado exitosamente', type: Jurado })
    updateJurado(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateJuradoDto) {
        return this.juradosService.updateJurado(id, user);
    }
}
