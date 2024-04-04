import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

import { Request as Req } from 'express';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'El usuario ha sido creado exitosamente', type: User })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    createUser(@Body() newUser: CreateUserDto) {
        return this.usersService.createUser(newUser);
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios', type: [User] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get('profile')
    @ApiOperation({ summary: 'Obtener el perfil del usuario' })
    @ApiResponse({ status: 200, description: 'Perfil del usuario', type: User })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.User)
    getUser(@Request() request: Req) {
        return this.usersService.getUser(request);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por su ID' })
    @ApiResponse({ status: 200, description: 'El usuario ha sido eliminado exitosamente' })
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
    @ApiResponse({ status: 200, description: 'El usuario ha sido actualizado exitosamente', type: User })
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
        return this.usersService.updateUser(id, user);
    }
}
