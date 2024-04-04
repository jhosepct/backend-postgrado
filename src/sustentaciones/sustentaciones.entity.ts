import { Intento } from "src/intentos/intentos.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity,ManyToOne,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sustentaciones' })
export class Sustentacion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number

    @Column()
    date: Date

    @Column()
    place: string

    @Column()
    approval: boolean

    @ManyToOne(() => Intento, (intento) => intento.sustentaciones)
    intento: Intento

    @ManyToOne(() => Tesis, (tesis) => tesis.sustentacion)
    tesis: Tesis

    // @OneToMany(() => Expedito, (expedito) => expedito.sustentacion)
    // sustentacion: Sustentacion[]

}