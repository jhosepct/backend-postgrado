import { Controller, Get, UseGuards } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { Document } from './documents.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/utils/decorador/roles.decorador';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/utils/enum/roles.enum';

@Controller('documents')
export class DocumentsController {
    constructor(private documentsService: DocumentsService) { }

    @Get()
    @ApiOperation({ summary: 'Lista de documentos' })
    @ApiResponse({ status: 201, description: 'Lista de documentos', type: Document })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async getDocuments() {
        return this.documentsService.getDocuments();
    }
}
