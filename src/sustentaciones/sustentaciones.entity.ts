import { Intento } from "src/intentos/intentos.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Document } from "src/documents/documents.entity";
import { Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sustentaciones' })
export class Sustentacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true})
    intentoId: number

    @Column()
    date: Date

    @Column()
    place: string

    @Column({ nullable: true})
    approval: boolean

    @ManyToOne(() => Intento, (intento) => intento.sustentaciones)
    intento: Intento

    @ManyToOne(() => Tesis, (tesis) => tesis.sustentacion)
    tesis: Tesis

    @ManyToOne(() => Document, (document) => document.sustentacion)
    document: Document

    // @OneToMany(() => Expedito, (expedito) => expedito.sustentacion)
    // sustentacion: Sustentacion[]

}