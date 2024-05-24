import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Jurado } from './jurados.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJuradoDto } from './dto/create-jurado.dto';
import { Request } from 'express';
import { UpdateJuradoDto } from './dto/update-jurado.dto';

@Injectable()
export class JuradosService {
    constructor(
        @InjectRepository(Jurado) private juradoRepository: Repository<Jurado>,
        //@InjectRepository(Admin) private adminRepository: Repository<Admin>,
    ) { }

    async createJurado(jurado: CreateJuradoDto) {
        /* const juradoFound = await this.juradoRepository.findOneBy({ email: jurado.email });
        if (juradoFound) throw new HttpException('Account exists', HttpStatus.CONFLICT); */

        const newJurado = this.juradoRepository.create(jurado);
        return this.juradoRepository.save(newJurado);
    }

    async getJurados() {
        const jurados = await this.juradoRepository.find({ relations: ["docente"] });


        const response = jurados.map((jurado) => {
            return jurado.docente.ToJSON();
        });

        return response;
    }

    async getJurado(id: number) {
        const juradoFound = await this.juradoRepository.findOneBy({ id });
        if (!juradoFound) throw new HttpException('Jurado not found', HttpStatus.NOT_FOUND);

        return juradoFound;
    }

    async deleteJurado(id: number) {
        const result = await this.juradoRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Jurado not found', HttpStatus.NOT_FOUND);

        return new HttpException('Jurado deleted', HttpStatus.OK);
    }

    async updateJurado(id: number, jurado: UpdateJuradoDto) {
        const result = await this.juradoRepository.update(id, jurado);
        if (result.affected === 0) throw new HttpException('Jurado not found', HttpStatus.NOT_FOUND);
        const res = await this.juradoRepository.findOneBy({ id });
        return res;
    }
}
