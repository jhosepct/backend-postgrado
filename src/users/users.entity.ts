import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender } from "../utils/enum/gender.enum";
import { Tesis } from "src/tesis/tesis.entity";
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 100 })
    name: string;

    @Column({ nullable: true, length: 100 })
    lastName: string;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column({ length: 8, unique: true })
    dni: string;

    @Column({ length: 11, unique: true })
    codeInts: string;

    @Column({ default: 'user' })
    role: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    gender: Gender;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Tesis, (tesis) => tesis.user)
    tesis: Tesis[]

    ToJSON() {
        return {
            id: this.id,
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            dni: this.dni,
            codeInts: this.codeInts,
            phone: this.phone,
            gender: this.gender,
        };
    }
}