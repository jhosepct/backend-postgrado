import { Injectable } from '@nestjs/common';
import { Document } from './documents.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentsService {

    constructor(
        @InjectRepository(Document) private documentsRepository: Repository<Document>,
    ) {}


    async getDocuments() {
        return this.documentsRepository.find();
    }
}
