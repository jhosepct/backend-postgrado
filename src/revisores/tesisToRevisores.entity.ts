import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Revisor } from "./revisores.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Document } from "src/documents/documents.entity";

@Entity()
export class TesisToRevisores {
    @PrimaryGeneratedColumn()
    tesisToRevisorId: number

    @Column()
    tesisId: number

    @Column()
    revisorId: number

    @Column({ nullable: true})
    documentId: number

    @ManyToOne(() => Tesis, (tesis) => tesis.tesisToRevisores)
    tesis: Tesis

    @ManyToOne(() => Revisor, (revisor) => revisor.tesisToRevisores)
    revisor: Revisor

    @ManyToOne(() => Document, (docuement) => docuement.tesisToRevisores)
    document: Document
    
}