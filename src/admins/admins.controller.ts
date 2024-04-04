import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { Admin } from './admins.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('admins')
@Controller('admins')

// @Roles(Role.Admin)
export class AdminsController {
    constructor(private adminsService: AdminsService) { }

    @Post()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiOperation({ summary: 'Crear un nuevo administrador' })
    @ApiResponse({ status: 201, description: 'El administrador ha sido creado exitosamente', type: Admin })
    @ApiBearerAuth()
    createAdmin(@Body() newAdmin: CreateAdminDto) {
        return this.adminsService.createAdmin(newAdmin);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los administradores' })
    @ApiResponse({ status: 200, description: 'Lista de administradores', type: [Admin] })
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    getAdmins(): Promise<Admin[]> {
        return this.adminsService.getAdmins();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un administrador por su ID' })
    @ApiResponse({ status: 200, description: 'El administrador ha sido encontrado', type: Admin })
    @ApiResponse({ status: 404, description: 'El administrador no fue encontrado' })
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    getAdmin(@Param('id', ParseIntPipe) id: number) {
        return this.adminsService.getAdmin(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un administrador por su ID' })
    @ApiResponse({ status: 200, description: 'El administrador ha sido eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'El administrador no fue encontrado' })
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    deleteAdmin(@Param('id', ParseIntPipe) id: number) {
        return this.adminsService.deleteAdmin(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un administrador por su ID' })
    @ApiResponse({ status: 200, description: 'El administrador ha sido actualizado exitosamente', type: Admin })
    @ApiResponse({ status: 404, description: 'El administrador no fue encontrado' })
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    updateAdmin(@Param('id', ParseIntPipe) id: number, @Body() admin: UpdateAdminDto) {
        return this.adminsService.updateAdmin(id, admin);
    }
}
