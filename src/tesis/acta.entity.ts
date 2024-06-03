import { Document } from "src/documents/documents.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'tesis' })
export class Acta {
    @PrimaryGeneratedColumn()
    id: number;
   
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;

    @ManyToOne(() => Document, (document) => document.acta)
    document: Document

    @OneToMany(() => Tesis, (tesis) => tesis.acta)
    tesis: Tesis[]

    ToJSON() {
        return {
            id: this.id,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }

}