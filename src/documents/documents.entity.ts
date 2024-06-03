import { Tesis } from "src/tesis/tesis.entity";
import { Sustentacion } from "src/sustentaciones/sustentaciones.entity";
import { TesisToRevisores } from "src/revisores/tesisToRevisores.entity";
import { Acta } from "src/tesis/acta.entity";
import { Column, Entity, ManyToOne,  OneToMany,  PrimaryGeneratedColumn } from "typeorm";
import { Expedito } from "src/expeditos/expeditos.entity";

@Entity({ name: 'documents' })
export class Document {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Tesis, (tesis) => tesis.document)
    tesis: Tesis[]

    @OneToMany(() => TesisToRevisores, (tesisToRevisores) => tesisToRevisores.document)
    tesisToRevisores: TesisToRevisores[]

    @OneToMany(() => Expedito, (expedito) => expedito.document)
    expedito: Expedito[]

    @OneToMany(() => Sustentacion, (sustentacion) => sustentacion.document)
    sustentacion: Sustentacion[]

    @OneToMany(() => Acta, (acta) => acta.document)
    acta: Sustentacion[]

    /* @Column({ type: 'bytea', nullable: true })
    file: Buffer; */

    @Column({ nullable: true })
    urlFile: string;
        
        
    ToJSON() {
        return {
            id: this.id,
            urlFile: this.urlFile,
            //file: this.file.toString('base64')
        }
    }

}