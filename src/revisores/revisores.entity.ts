import { Docente } from "src/docentes/docentes.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { TesisToRevisores } from "./tesisToRevisores.entity";

@Entity({ name: 'revisores' })
export class Revisor {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Docente, (docente) => docente.revisores)
    docente: Docente

    @OneToMany(() => TesisToRevisores, questionToCategory => questionToCategory.revisor)
    tesisToRevisores: TesisToRevisores[];

    @Column({ nullable: true })
    description: string;

}