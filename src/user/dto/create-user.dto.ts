import { IsDateString, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Role } from "../../enums/role.enum";

export class CreateUserDTO {
    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minNumbers: 0,
        minLowercase: 0,
        minUppercase: 0,
        minSymbols: 0
    })
    password: string

    @IsOptional()
    @IsDateString()
    birthAt: Date;

    @IsOptional()
    @IsEnum(Role)
    role: number;
}