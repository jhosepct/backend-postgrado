import { Docente } from "src/docentes/docentes.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'lineasInvestigacion' })
export class LineaInvestigacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 100 })
    name: string;

    @OneToMany(() => Docente, (docente) => docente.lineaInvestigacion)
    docentes: Docente[]
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;


    ToJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }

}