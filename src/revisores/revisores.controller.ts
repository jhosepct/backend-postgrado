import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RevisoresService } from './revisores.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { CreateRevisorDto } from './dto/create-revisor.dto';
import { Revisor } from './revisores.entity';
import { UpdateRevisorDto } from './dto/update-revisor.dto';

@ApiBearerAuth()
@ApiTags('revisores')
@Controller('revisores')
export class RevisoresController {
    constructor(private revisoresService: RevisoresService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo revisor' })
    @ApiResponse({ status: 201, description: 'El revisor ha sido creado exitosamente', type: Revisor })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createRevisor(@Body() newRevisor: CreateRevisorDto) {
        return this.revisoresService.createRevisor(newRevisor);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los revisors' })
    @ApiResponse({ status: 200, description: 'Lista de revisors', type: [Revisor] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getRevisors(): Promise<Revisor[]> {
        return this.revisoresService.getRevisors();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener el perfil del revisor por su ID' })
    @ApiResponse({ status: 200, description: 'Perfil del revisor', type: Revisor })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getRevisor(@Param('id', ParseIntPipe) id: number ) {
        return this.revisoresService.getRevisor(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un revisor por su ID' })
    @ApiResponse({ status: 200, description: 'El revisor ha sido eliminado exitosamente' })
    deleteRevisor(@Param('id', ParseIntPipe) id: number) {
        return this.revisoresService.deleteRevisor(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un revisor por su ID' })
    @ApiResponse({ status: 200, description: 'El revisor ha sido actualizado exitosamente', type: Revisor })
    updateRevisor(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateRevisorDto) {
        return this.revisoresService.updateRevisor(id, user);
    }
}
