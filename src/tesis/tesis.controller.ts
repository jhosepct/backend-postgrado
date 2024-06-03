import { Body, Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { TesisService } from './tesis.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tesis } from './tesis.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { Role } from 'src/utils/enum/roles.enum';
import { CreateFaseUnoDto } from './dto/create-fase-uno.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateFaseDosDto } from './dto/create-fase-dos.dto';
import { CreateFaseTresDto } from './dto/create-fase-tres.dto';
import { Revisor } from 'src/revisores/revisores.entity';
import { CreateFaseCuartoDto } from './dto/create-fase-cuarto.dto';
import { CreateSupportDateDto } from './dto/create-support-date.dto';

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

    @Post('second-phase')
    @ApiOperation({ summary: 'Crear segunda fase' })
    @ApiResponse({ status: 201, description: 'Fase dos creada', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async createSecondPhase(@Body() body: CreateFaseDosDto) {
        return this.tesisService.createSecondTwo(body);
    }

    @Post('third-phase')
    @ApiOperation({ summary: 'Crear tercera fase' })
    @ApiResponse({ status: 201, description: 'Fase tres creada', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                phaseThird: { type: 'string', format: 'json' },
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async createThirdPhase(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        const phaseThird: CreateFaseTresDto = JSON.parse(body.phaseThird);
        return this.tesisService.createThirdPhase(phaseThird, file);
    }

    @Post('fourth-phase')
    @ApiOperation({ summary: 'Crear cuarta fase' })
    @ApiResponse({ status: 201, description: 'Fase cuarta creada', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('files')) // Ajusta el nombre del campo si es necesario
    async createFourthPhase(@UploadedFiles() files: Express.Multer.File[], @Body() body: any) {
        const userId = body.userId;
        const phaseFourthdArray: CreateFaseCuartoDto[] = [];

        // Itera sobre los datos enviados para construir phaseFourthdArray
        for (let i = 0; i < body.docents.length; i++) {
            const docentId = body.docents[i];

            // Encuentra el archivo correspondiente en el array de files
            const file = files[i];

            // Agrega el objeto { docentId, file } a phaseFourthdArray
            phaseFourthdArray.push({ docentId, file });
        }
        return this.tesisService.createFourthPhase(userId, phaseFourthdArray);
    }

    @Post('fifth-phase')
    @ApiOperation({ summary: 'Crear quinta fase' })
    @ApiResponse({ status: 201, description: 'Quinta fase creada', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string' }, // Especifica que el campo user es un string en formato JSON
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async createFifthPhase(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        const userId = body.userId;
        
        return this.tesisService.createFifthPhase(userId, file);
    }

    @Post('support-date')
    @ApiOperation({ summary: 'Listar Revisores' })
    @ApiResponse({ status: 201, description: 'Lista de revisores', type: [Tesis] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                createSupportDate: { type: 'string', format: 'json'},
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async createSupportDate(@UploadedFile() file: Express.Multer.File, @Body() body: any) {

        const createSupportDateDto: CreateSupportDateDto = JSON.parse(body.createSupportDate);
        return this.tesisService.createSupportDate(createSupportDateDto, file);
    }

    @Post('support-date')
    @ApiOperation({ summary: 'Listar Revisores' })
    @ApiResponse({ status: 201, description: 'Lista de revisores', type: [Tesis] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string'},
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    async createActa(@UploadedFile() file: Express.Multer.File, @Body() body: any) {
        const userId = body.userId;
        return this.tesisService.createActa(userId, file);
    }

    @Get('reviewers/:id')
    @ApiOperation({ summary: 'Listar Revisores' })
    @ApiResponse({ status: 201, description: 'Lista de revisores', type: [Revisor] })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getReviewersByUserId(@Param('id', ParseIntPipe) id: number) {
        return this.tesisService.getReviewersByUserId(id);
    }

    @Post('message')
    @ApiOperation({ summary: 'Enviar mensaje' })
    @ApiResponse({ status: 201, description: 'Mensaje enviado', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async sendMessage() {
        return this.tesisService.sendMessage();
    }

    @Get()
    @ApiOperation({ summary: 'Lista de tesis' })
    @ApiResponse({ status: 201, description: 'Lista de tesis', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getTesis() {
        return this.tesisService.getTesis();
    }

    @Get('user/:id')
    @ApiOperation({ summary: 'Tesis by user' })
    @ApiResponse({ status: 201, description: 'Tesis', type: Tesis })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getTesisByUser(@Param('id', ParseIntPipe) id: number) {
        return this.tesisService.getTesisByUser(id);
    }

}
