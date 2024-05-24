import { Asesor } from "src/asesores/asesores.entity";
import { Document } from "src/documents/documents.entity";
import { Expedito } from "src/expeditos/expeditos.entity";
import { Fase } from "src/fases/fases.entity";
import { Sustentacion } from "src/sustentaciones/sustentaciones.entity";
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

    @ManyToOne(() => User, (user) => user.tesis)
    user: User

    @ManyToOne(() => Fase, (fase) => fase.tesis)
    fase: Fase

    @ManyToOne(() => Asesor, (asesor) => asesor.tesis)
    asesor: Asesor
   
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;


    @OneToMany(() => Document, (documents) => documents.tesis)
    documents: Document[]

    @OneToMany(() => Sustentacion, (sustentacion) => sustentacion.tesis)
    sustentacion: Sustentacion[]

    ToJSON() {
        return {
            
        }
    }

}