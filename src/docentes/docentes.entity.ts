import { Asesor } from "src/asesores/asesores.entity";
import { Jurado } from "src/jurados/jurados.entity";
import { LineaInvestigacion } from "src/lineas-investigacion/lineas-investigacion.entity";
import { Periodo } from "src/periodos/periodos.entity";
import { Revisor } from "src/revisores/revisores.entity";
import { Column, CreateDateColumn, Entity, ManyToOne,  OneToMany,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'docentes' })
export class Docente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 100 })
    name: string;

    @Column({ nullable: true, length: 100 })
    lastname: string;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column({ nullable: true, length: 8 })
    dni: string;

    @ManyToOne(() => LineaInvestigacion, (lineaInvestigacion) => lineaInvestigacion.docentes)
    lineaInvestigacion: LineaInvestigacion
        
    @ManyToOne(() => Periodo, (periodo) => periodo.docentes)
    periodo: Periodo;

    @Column()
    grado: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @OneToMany(() => Jurado, (jurado) => jurado.docente)
    jurados: Jurado[]

    @OneToMany(() => Asesor, (asesor) => asesor.docente)
    asesores: Asesor[]

    @OneToMany(() => Revisor, (revisor) => revisor.docente)
    revisores: Revisor[]
    ToJSON() {
        return {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            dni: this.dni,
            grado: this.grado
        }
    }

}