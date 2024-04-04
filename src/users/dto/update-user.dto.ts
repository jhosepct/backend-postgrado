import { IsOptional, Validate } from "class-validator";
import { Gender } from "../../utils/enum/gender.enum";
import { toGender } from "src/utils/validation/gender";

export class UpdateUserDto {
    
    @IsOptional()
    readonly name?: string;
    @IsOptional()
    readonly lastname?: string;
    @IsOptional()
    readonly phone?: string;
    @IsOptional()
    @Validate(toGender)
    readonly gender?: Gender;
}