import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tesis } from './tesis.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { CreateFaseUnoDto } from './dto/create-fase-uno.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('tesis')
export class TesisController {
    constructor(private tesisService: TesisService) { }

    @Post('first-phase')
    @ApiOperation({ summary: 'Crear primera fase' })
    @ApiResponse({ status: 201, description: 'Fase uno creada', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                user: { type: 'string', format: 'json' }, // Especifica que el campo user es un string en formato JSON
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async createFirstPhase(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        const user: CreateUserDto = JSON.parse(body.user);
        return this.tesisService.createFaseUno(user, file);
    }

}
