import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tesis } from './tesis.entity';
import { CreateFaseUnoDto } from './dto/create-fase-uno.dto';
import { User } from 'src/users/users.entity';
import { Document } from 'src/documents/documents.entity';

@Injectable()
export class TesisService {
    constructor(
        @InjectRepository(Tesis) private tesisRepository: Repository<Tesis>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Document) private documentsRepository: Repository<Document>,
    ) { }

    async createFaseUno(data: CreateFaseUnoDto) {
        const userCreate = this.usersRepository.create(data.user);

        const user = await this.usersRepository.save(userCreate);
        const tesisCreate = this.tesisRepository.create({
            user: user,
        });
        const tesis = await this.tesisRepository.save(tesisCreate);

        const document = this.documentsRepository.create({
            tesis: tesis,
            file: data.file,
        });
        await this.documentsRepository.save(document);
        return this.tesisRepository.save(tesis);
    }

    async createFaseUnoWithIdUser(data: any, id: number) {
         const user = await this.usersRepository.findOne({where: {id}});
         
         const tesisCreate = this.tesisRepository.create({
            user: user,
        });
        const tesis = await this.tesisRepository.save(tesisCreate);

         const document = this.documentsRepository.create({
             tesis: tesis,
             file: data.file,
         });
         await this.documentsRepository.save(document);
         return this.tesisRepository.save(tesis);
    }
}
