import { Docente } from "src/docentes/docentes.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Entity,  ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'asesores' })
export class Asesor {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Docente, (docente) => docente.asesores)
    docente: Docente

    @OneToMany(() => Tesis, (tesis) => tesis.asesor)
    tesis: Tesis[]

}