import { Docente } from "src/docentes/docentes.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'periodos' })
export class Periodo {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Docente, (docente) => docente.lineaInvestigacion)
    docentes: Docente[]

    @Column()
    year: number;
    
    @Column()
    semester: number;
    
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;


    ToJSON() {
        return {
            id: this.id,
            year: this.year,
            semester: this.semester
        }
    }

}