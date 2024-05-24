import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRevisorDto } from './dto/create-revisor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Revisor } from './revisores.entity';
import { Repository } from 'typeorm';
import { UpdateRevisorDto } from './dto/update-revisor.dto';

@Injectable()
export class RevisoresService {
    constructor(
        @InjectRepository(Revisor) private juradoRepository: Repository<Revisor>,
    ) { }

    async createRevisor(jurado: CreateRevisorDto) {
        /* const juradoFound = await this.juradoRepository.findOneBy({ email: jurado.email });
        if (juradoFound) throw new HttpException('Account exists', HttpStatus.CONFLICT); */

        const newRevisor = this.juradoRepository.create(jurado);
        return this.juradoRepository.save(newRevisor);
    }

    async getRevisors() {
        const jurados = await this.juradoRepository.find({ relations: ["docente"] });


        const response = jurados.map((jurado) => {
            return jurado.docente.ToJSON();
        });

        return response;
    }

    async getRevisor(id: number) {
        const juradoFound = await this.juradoRepository.findOneBy({ id });
        if (!juradoFound) throw new HttpException('Revisor not found', HttpStatus.NOT_FOUND);

        return juradoFound;
    }

    async deleteRevisor(id: number) {
        const result = await this.juradoRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Revisor not found', HttpStatus.NOT_FOUND);

        return new HttpException('Revisor deleted', HttpStatus.OK);
    }

    async updateRevisor(id: number, jurado: UpdateRevisorDto) {
        const result = await this.juradoRepository.update(id, jurado);
        if (result.affected === 0) throw new HttpException('Revisor not found', HttpStatus.NOT_FOUND);
        const res = await this.juradoRepository.findOneBy({ id });
        return res;
    }
}
