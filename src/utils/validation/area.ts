import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Gender } from "../enum/gender.enum";
import { AreaJobs } from "../enum/area.enum";

@ValidatorConstraint({ name: 'toArea', async: false })
export class toArea implements ValidatorConstraintInterface {
    validate(value: String, _validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        if (value === undefined) return false;
        const newValue = value.toLowerCase();
        return newValue === AreaJobs.ATTENTION || newValue === AreaJobs.CLEANING || newValue === AreaJobs.KITCHEN;
    }
    defaultMessage?(_validationArguments?: ValidationArguments): string {
        return 'Please enter a valid area value'
    }

}