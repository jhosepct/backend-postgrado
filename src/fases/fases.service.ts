import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fase } from './fases.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FasesService {
    constructor(
        @InjectRepository(Fase) private faseRepository: Repository<Fase>,
    ) { }

    async createFase(fase: Fase) {
        const newFase = this.faseRepository.create(fase);
        return this.faseRepository.save(newFase);
    }

    getFases() {
        return this.faseRepository.find();
    }

    async getFase(id: number) {
        const faseFound = await this.faseRepository.findOneBy({ id });
        if (!faseFound) throw new HttpException('Fase not found', HttpStatus.NOT_FOUND);

        return faseFound.ToJSON();
    }

    async deleteFase(id: number) {
        const result = await this.faseRepository.delete(id);
        if (result.affected === 0) throw new HttpException('Fase not found', HttpStatus.NOT_FOUND);

        return new HttpException('Fase deleted', HttpStatus.OK);
    }

    async updateFase(id: number, fase: Fase) {
        const result = await this.faseRepository.update(id, fase);
        if (result.affected === 0) throw new HttpException('Fase not found', HttpStatus.NOT_FOUND);
        const res = await this.faseRepository.findOneBy({ id });
        return res;
    }
}
