import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Docente } from './docentes.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { Request } from 'express';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { LineaInvestigacion } from 'src/lineas-investigacion/lineas-investigacion.entity';

@Injectable()
export class DocentesService {
    constructor(
        @InjectRepository(Docente) private docenteRepository: Repository<Docente>,
        @InjectRepository(LineaInvestigacion) private lineaInvestigacionRepository: Repository<LineaInvestigacion>,
    ) { }

    async createDocente(docente: CreateDocenteDto) {
        const docenteFound = await this.docenteRepository.findOneBy({ email: docente.email });
        if (docenteFound) throw new HttpException('Account exists', HttpStatus.CONFLICT);

        const lineaInvestigacion = await this.lineaInvestigacionRepository.findOneBy({ id: docente.lineaInvestigacion });
        if (!lineaInvestigacion) throw new HttpException('Linea Investigacion not found', HttpStatus.NOT_FOUND);

        const newDocente = this.docenteRepository.create({
            name: docente.name,
            lastname: docente.lastName,
            email: docente.email,
            dni: docente.dni,
            grado: docente.grado,
            lineaInvestigacion: lineaInvestigacion,
        });
        return this.docenteRepository.save(newDocente);
    }

    getDocentes() {
        return this.docenteRepository.find({relations: ["lineaInvestigacion"]  });
    }

    async getDocente(id: number) {
        const docenteFound = await this.docenteRepository.findOneBy({ id });
        if (!docenteFound) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);

        return docenteFound.ToJSON();
    }

    async deleteDocente(id: number) {
        const result = await this.docenteRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);

        return new HttpException('Docente deleted', HttpStatus.OK);
    }

    async updateDocente(id: number, docente: UpdateDocenteDto) {
        const result = await this.docenteRepository.update(id, docente);
        if (result.affected === 0) throw new HttpException('Docente not found', HttpStatus.NOT_FOUND);
        const res = await this.docenteRepository.findOneBy({ id });
        return res;
    }
}
