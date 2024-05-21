import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LineaInvestigacion } from './lineas-investigacion.entity';
import { Repository } from 'typeorm';
import { CreateLineaInvestigacionDto } from './dto/create-linea-investigacion.dto';
import { UpdateLineaInvestigacionDto } from './dto/update-linea-investigacion.dto';


@Injectable()
export class LineasInvestigacionService {
    constructor(
        @InjectRepository(LineaInvestigacion) private juradoRepository: Repository<LineaInvestigacion>,
    ) { }

    async createLineaInvestigacion(jurado: CreateLineaInvestigacionDto) {
        /* const juradoFound = await this.juradoRepository.findOneBy({ email: jurado.email });
        if (juradoFound) throw new HttpException('Account exists', HttpStatus.CONFLICT); */

        const newLineaInvestigacion = this.juradoRepository.create(jurado);
        return this.juradoRepository.save(newLineaInvestigacion);
    }

    getLineasInvestigacion() {
        return this.juradoRepository.find();
    }

    async getLineaInvestigacion(id: number) {
        const juradoFound = await this.juradoRepository.findOneBy({ id });
        if (!juradoFound) throw new HttpException('LineaInvestigacion not found', HttpStatus.NOT_FOUND);

        return juradoFound;
    }

    async deleteLineaInvestigacion(id: number) {
        const result = await this.juradoRepository.delete(id);
        if (result.affected === 0) throw new HttpException('LineaInvestigacion not found', HttpStatus.NOT_FOUND);

        return new HttpException('LineaInvestigacion deleted', HttpStatus.OK);
    }

    async updateLineaInvestigacion(id: number, jurado: UpdateLineaInvestigacionDto) {
        const result = await this.juradoRepository.update(id, jurado);
        if (result.affected === 0) throw new HttpException('LineaInvestigacion not found', HttpStatus.NOT_FOUND);
        const res = await this.juradoRepository.findOneBy({ id });
        return res;
    }
}
