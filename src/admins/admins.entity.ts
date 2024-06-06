import { Gender } from "src/utils/enum/gender.enum";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'admins' })
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, length: 100 })
    name: string;

    @Column({ nullable: true, length: 100 })
    lastname: string;

    @Column({ unique: true, length: 50 })
    email: string;

    @Column({ length: 100 })
    password: string;

    @Column({ default: 'admin' })
    role: string;

    @Column({ nullable: true, length: 8 })
    dni: string;

    @Column({ nullable: true })
    gender: Gender;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;


    ToJSON() {
        return {
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            dni: this.dni
        }
    }

}