import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'expeditos' })
export class Expedito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    issueDate: Date

    @OneToMany(() => Tesis, (tesis) => tesis.asesor)
    tesis: Tesis[]

}