import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateDocenteDto {
    @IsEmail()
    @ApiProperty()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @Length(11)
    @ApiProperty()
    readonly codeInts: string;
    @IsNotEmpty()
    @IsString()
    @Length(8, 8)
    @ApiProperty()
    readonly dni: string;
}