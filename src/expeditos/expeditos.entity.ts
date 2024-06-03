import { Document } from "src/documents/documents.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity,ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'expeditos' })
export class Expedito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    issueDate: Date 

    @OneToMany(() => Tesis, (tesis) => tesis.asesor)
    tesis: Tesis[]

    @ManyToOne(() => Document, (docuement) => docuement.expedito)
    document: Document

}