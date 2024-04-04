import { Docente } from "src/docentes/docentes.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'jurados' })
export class Jurado {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Docente, (docente) => docente.jurados)
    docente: Docente

    @ManyToMany(() => Tesis)
    @JoinTable()
    tesis: Tesis[]

    @Column({ nullable: true })
    description: string;

}