import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity, ManyToOne,  PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'documents' })
export class Document {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Tesis, (tesis) => tesis.documents)
    tesis: Tesis

    @Column({ type: 'bytea', nullable: true })
    fileName: Buffer;    

    ToJSON() {
        return {
            id: this.id,
            tesis: this.tesis,
            fileName: this.fileName
        }
    }

}