import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";
export class CreateFaseUnoDto {
    user: CreateUserDto;
    file: Buffer;
}