import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateDocenteDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
    @IsEmail()
    @ApiProperty()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    @Length(8, 8)
    @ApiProperty()
    readonly dni: string;
    @IsString()
    @IsNotEmpty()
    readonly grado: string;
    readonly lineaInvestigacion: number;
}