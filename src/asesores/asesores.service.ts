import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Asesor } from './asesores.entity';
import { Repository } from 'typeorm';
import { CreateAsesorDto } from './dto/create-asesor.dto';
import { UpdateAsesorDto } from './dto/update-asesor.dto';


@Injectable()
export class AsesoresService {
    constructor(
        @InjectRepository(Asesor) private juradoRepository: Repository<Asesor>,
    ) { }

    async createAsesor(jurado: CreateAsesorDto) {
        /* const juradoFound = await this.juradoRepository.findOneBy({ email: jurado.email });
        if (juradoFound) throw new HttpException('Account exists', HttpStatus.CONFLICT); */

        const newAsesor = this.juradoRepository.create(jurado);
        return this.juradoRepository.save(newAsesor);
    }

    getAsesors() {
        return this.juradoRepository.find();
    }

    async getAsesor(id: number) {
        const juradoFound = await this.juradoRepository.findOneBy({ id });
        if (!juradoFound) throw new HttpException('Asesor not found', HttpStatus.NOT_FOUND);

        return juradoFound;
    }

    async deleteAsesor(id: number) {
        const result = await this.juradoRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Asesor not found', HttpStatus.NOT_FOUND);

        return new HttpException('Asesor deleted', HttpStatus.OK);
    }

    async updateAsesor(id: number, jurado: UpdateAsesorDto) {
        const result = await this.juradoRepository.update(id, jurado);
        if (result.affected === 0) throw new HttpException('Asesor not found', HttpStatus.NOT_FOUND);
        const res = await this.juradoRepository.findOneBy({ id });
        return res;
    }
}
