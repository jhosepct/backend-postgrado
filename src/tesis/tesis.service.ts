import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tesis } from './tesis.entity';
import { CreateFaseUnoDto } from './dto/create-fase-uno.dto';
import { User } from 'src/users/users.entity';
import { Document } from 'src/documents/documents.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateFaseDosDto } from './dto/create-fase-dos.dto';
import { Asesor } from 'src/asesores/asesores.entity';
import { Docente } from 'src/docentes/docentes.entity';

@Injectable()
export class TesisService {
    constructor(
        @InjectRepository(Tesis) private tesisRepository: Repository<Tesis>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Document) private documentsRepository: Repository<Document>,
        @InjectRepository(Asesor) private asesoresRepository: Repository<Asesor>,
        @InjectRepository(Docente) private docentesRepository: Repository<Docente>,


    ) { }

    async createFaseUno(userData: CreateUserDto, file: Express.Multer.File) {
        console.log(userData, file);
        const userCreate = this.usersRepository.create(userData);
        const user = await this.usersRepository.save(userCreate);

        const tesisCreate = this.tesisRepository.create({
            user: user,
        });
        const tesis = await this.tesisRepository.save(tesisCreate);

        const document = this.documentsRepository.create({
            tesis: tesis,
            file: null, //file.buffer,
        });
        await this.documentsRepository.save(document);
        return tesis;
    }

    async createSecondTwo(body: CreateFaseDosDto) {
        const tesis = await this.tesisRepository.findOne({ where: { user: { id: body.userId } } });
        
        if (!tesis) throw new HttpException('Tesis or User not found', HttpStatus.NOT_FOUND);

        const docente = await this.docentesRepository.findOne({ where: { id: body.docenteId } });

        if(!docente) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);

        const asesor = this.asesoresRepository.create({
            docente: docente,
        })

        const asesorSave = await this.asesoresRepository.save(asesor);

        tesis.asesor = asesorSave;

        return this.tesisRepository.save(tesis);
      
    }
    
    async getTesis() {
        const tesis = await this.tesisRepository.find({ relations: ["user", "asesor", "asesor.docente", "asesor.docente.lineaInvestigacion", "asesor.docente.periodo", "asesor.docente.jurados", "asesor.docente.asesores", "asesor.docente.revisores"] });

        console.log(tesis);

        const response = tesis.map((tesi) => {
            return tesi.ToJSON();
        });

        return tesis;
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
