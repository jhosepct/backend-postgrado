import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Validate } from "class-validator";
import { Gender } from "src/utils/enum/gender.enum";
import { toGender } from "src/utils/validation/gender";


export class CreateAdminDto {
    @IsEmail()
    @IsString()
    @ApiProperty()
    readonly email: string;

    @Length(8, 20)
    @IsString()
    @ApiProperty()
    readonly password: string;
}

export class ResponseAdminDto {
    @ApiProperty()
    readonly status?: number;
}