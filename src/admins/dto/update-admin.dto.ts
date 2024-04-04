import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength, Validate } from "class-validator";
import { Gender } from "src/utils/enum/gender.enum";
import { toGender } from "src/utils/validation/gender";
export class UpdateAdminDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly photo?: string;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly name: string;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(8, 8)
    @ApiProperty()
    readonly dni: string;
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly phone: string;
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty()
    readonly birthdate: Date;
    @IsOptional()
    @IsNotEmpty()
    @Validate(toGender)
    @ApiProperty()
    readonly gender: Gender;
}