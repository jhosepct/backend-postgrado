import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Express } from 'express'; 

export class CreateFaseUnoDto {
    user: CreateUserDto;
    @ApiProperty({ type: 'string', format: 'binary' }) // Indica que se espera un archivo
    file: Express.Multer.File;
}