import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DocentesService } from './docentes.service';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Docente } from './docentes.entity';

import { Request as Req } from 'express';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';

@ApiBearerAuth()
@ApiTags('docentes')
@Controller('docentes')
export class DocentesController {
    constructor(private docentesService: DocentesService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo docente' })
    @ApiResponse({ status: 201, description: 'El docente ha sido creado exitosamente', type: Docente })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createDocente(@Body() newDocente: CreateDocenteDto) {
        return this.docentesService.createDocente(newDocente);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los docentes' })
    @ApiResponse({ status: 200, description: 'Lista de docentes', type: [Docente] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getDocentes(): Promise<Docente[]> {
        return this.docentesService.getDocentes();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener el perfil del docente por su ID' })
    @ApiResponse({ status: 200, description: 'Perfil del docente', type: Docente })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getDocente(@Param('id', ParseIntPipe) id: number ) {
        return this.docentesService.getDocente(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un docente por su ID' })
    @ApiResponse({ status: 200, description: 'El docente ha sido eliminado exitosamente' })
    deleteDocente(@Param('id', ParseIntPipe) id: number) {
        return this.docentesService.deleteDocente(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un docente por su ID' })
    @ApiResponse({ status: 200, description: 'El docente ha sido actualizado exitosamente', type: Docente })
    updateDocente(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateDocenteDto) {
        return this.docentesService.updateDocente(id, user);
    }
}
