import { Asesor } from "src/asesores/asesores.entity";
import { Document } from "src/documents/documents.entity";
import { Expedito } from "src/expeditos/expeditos.entity";
import { Fase } from "src/fases/fases.entity";
import { TesisToRevisores } from "src/revisores/tesisToRevisores.entity";
import { Sustentacion } from "src/sustentaciones/sustentaciones.entity";
import { Acta } from "src/tesis/acta.entity";
import { User } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tesis' })
export class Tesis {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 300 })
    name: string;

    @ManyToOne(() => Expedito, (expedito) => expedito.tesis)
    expedito: Expedito

    @Column({ default: false })
    isFaseCompleted: boolean

    @ManyToOne(() => User, (user) => user.tesis)
    user: User

    @ManyToOne(() => Fase, (fase) => fase.tesis)
    fase: Fase

    @ManyToOne(() => Asesor, (asesor) => asesor.tesis)
    asesor: Asesor
    
    @ManyToOne(() => Acta, (acta) => acta.tesis)
    acta: Acta
   
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @ManyToOne(() => Document, (document) => document.tesis)
    document: Document

    @OneToMany(() => Sustentacion, (sustentacion) => sustentacion.tesis)
    sustentacion: Sustentacion[]

    @OneToMany(() => TesisToRevisores, questionToCategory => questionToCategory.tesis)
    tesisToRevisores: TesisToRevisores[];

    ToJSON() {
        return {
            id: this.id,
            name: this.name,
            user: this.user,
            fase: this.fase,
            asesor: this.asesor,
            expedito: this.expedito,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }

}