import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AsesoresService } from './asesores.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { Asesor } from './asesores.entity';
import { UpdateAsesorDto } from './dto/update-asesor.dto';

@ApiBearerAuth()
@ApiTags('asesores')
@Controller('asesores')
export class AsesoresController {
    constructor(private asesoresService: AsesoresService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo asesor' })
    @ApiResponse({ status: 201, description: 'El asesor ha sido creado exitosamente', type: Asesor })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createAsesor(@Body() newAsesor: CreateAsesorDto) {
        return this.asesoresService.createAsesor(newAsesor);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los asesors' })
    @ApiResponse({ status: 200, description: 'Lista de asesors', type: [Asesor] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getAsesors(): Promise<Asesor[]> {
        return this.asesoresService.getAsesors();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener el perfil del asesor por su ID' })
    @ApiResponse({ status: 200, description: 'Perfil del asesor', type: Asesor })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getAsesor(@Param('id', ParseIntPipe) id: number ) {
        return this.asesoresService.getAsesor(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un asesor por su ID' })
    @ApiResponse({ status: 200, description: 'El asesor ha sido eliminado exitosamente' })
    deleteAsesor(@Param('id', ParseIntPipe) id: number) {
        return this.asesoresService.deleteAsesor(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un asesor por su ID' })
    @ApiResponse({ status: 200, description: 'El asesor ha sido actualizado exitosamente', type: Asesor })
    updateAsesor(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateAsesorDto) {
        return this.asesoresService.updateAsesor(id, user);
    }
}
