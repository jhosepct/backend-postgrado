import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
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
    @IsString()
    @IsNotEmpty()
    @Length(9, 9)
    @ApiProperty()
    readonly phone: string;
}