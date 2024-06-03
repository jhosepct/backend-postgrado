import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'fases' })
export class Fase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 100 })
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    fase: number;

    @OneToMany(() => Tesis, (tesis) => tesis.fase)
    tesis: Tesis[]

    ToJSON() {
        return {
            
        }
    }

}