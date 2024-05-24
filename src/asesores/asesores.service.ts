import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asesor } from './asesores.entity';
import { Repository } from 'typeorm';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';
import { ResponseAsesorDto } from './dto/response-asesor.dto';


@Injectable()
export class AsesoresService {
    constructor(
        @InjectRepository(Asesor) private asesorRepository: Repository<Asesor>,
    ) { }

    async createAsesor(jurado: CreateAsesorDto) {
        /* const juradoFound = await this.asesorRepository.findOneBy({ email: jurado.email });
        if (juradoFound) throw new HttpException('Account exists', HttpStatus.CONFLICT); */

        const newAsesor = this.asesorRepository.create(jurado);
        return this.asesorRepository.save(newAsesor);
    }

    async getAsesors() {
        const asesors = await this.asesorRepository.find({ relations: ["docente"] });

        console.log(asesors);

        const response = asesors.map((asesor) => {
            return asesor.docente.ToJSON();
        });

        return response;
    }

    async getAsesor(id: number) {
        const juradoFound = await this.asesorRepository.findOneBy({ id });
        if (!juradoFound) throw new HttpException('Asesor not found', HttpStatus.NOT_FOUND);

        return juradoFound;
    }

    async deleteAsesor(id: number) {
        const result = await this.asesorRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Asesor not found', HttpStatus.NOT_FOUND);

        return new HttpException('Asesor deleted', HttpStatus.OK);
    }

    async updateAsesor(id: number, jurado: UpdateAsesorDto) {
        const result = await this.asesorRepository.update(id, jurado);
        if (result.affected === 0) throw new HttpException('Asesor not found', HttpStatus.NOT_FOUND);
        const res = await this.asesorRepository.findOneBy({ id });
        return res;
    }
}
