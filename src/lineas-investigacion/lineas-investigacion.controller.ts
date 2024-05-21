import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { LineasInvestigacionService } from './lineas-investigacion.service';
import { LineaInvestigacion } from './lineas-investigacion.entity';
import { CreateLineaInvestigacionDto } from './dto/create-linea-investigacion.dto';
import { UpdateLineaInvestigacionDto } from './dto/update-linea-investigacion.dto';

@ApiBearerAuth()
@ApiTags('lineas-investigacion')
@Controller('lineas-investigacion')
export class LineasInvestigacionController {
    constructor(private lineasInvestigacionService: LineasInvestigacionService) { }

    @Post()
    @ApiOperation({ summary: 'Crear una nuevo linea investigacion' })
    @ApiResponse({ status: 201, description: 'El linea investigacion ha sido creado exitosamente', type: LineaInvestigacion })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createLineasInvestigacion(@Body() newLineasInvestigacion: CreateLineaInvestigacionDto) {
        return this.lineasInvestigacionService.createLineaInvestigacion(newLineasInvestigacion);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos las lineas investigacions' })
    @ApiResponse({ status: 200, description: 'Lista de linea investigacions', type: [LineaInvestigacion] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getLineasInvestigacions(): Promise<LineaInvestigacion[]> {
        return this.lineasInvestigacionService.getLineasInvestigacion();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener el perfil de la linea investigacion por su ID' })
    @ApiResponse({ status: 200, description: 'Perfil del linea investigacion', type: LineaInvestigacion })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getLineasInvestigacion(@Param('id', ParseIntPipe) id: number ) {
        return this.lineasInvestigacionService.getLineaInvestigacion(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar una linea investigacion por su ID' })
    @ApiResponse({ status: 200, description: 'El linea investigacion ha sido eliminado exitosamente' })
    deleteLineasInvestigacion(@Param('id', ParseIntPipe) id: number) {
        return this.lineasInvestigacionService.deleteLineaInvestigacion(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar una linea investigacion por su ID' })
    @ApiResponse({ status: 200, description: 'El linea investigacion ha sido actualizado exitosamente', type: LineaInvestigacion })
    updateLineasInvestigacion(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateLineaInvestigacionDto) {
        return this.lineasInvestigacionService.updateLineaInvestigacion(id, user);
    }
}
