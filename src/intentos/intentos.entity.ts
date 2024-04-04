import { Sustentacion } from "src/sustentaciones/sustentaciones.entity";
import { Tesis } from "src/tesis/tesis.entity";
import { Column, Entity,OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'intentos' })
export class Intento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number

    @OneToMany(() => Sustentacion, (sustentacion) => sustentacion.intento)
    sustentaciones: Sustentacion[]

}