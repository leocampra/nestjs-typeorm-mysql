import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { Repository } from "typeorm";
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly mailer: MailerService,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {

    }

    async createToken(user: UserEntity) {

        return {
            accesstoken: this.jwtService.sign({
                sub: user.id,
                nome: user.nome,
                email: user.email
            }, {
                expiresIn: "7 days",
                issuer: 'login',
                audience: 'users'
            })
        }
    }

    async checkToken(token: string) {
        try {
            return this.jwtService.verify(token, {
                audience: 'users'
            })
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async isValidToken(token: string) {
        try {
            this.checkToken(token)
            return true
        } catch (e) {
            return false
        }

    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new UnauthorizedException('Email e/ou senha incorretos')
        }
        if(!await bcrypt.compare(password, user.password)){
            throw new UnauthorizedException('Email e/ou senha incorretos')
        }
        return this.createToken(user);
    }

    async forget(email: string) {
        const user = await this.userRepository.findOneBy({
                email
        })
        if (!user) {
            throw new UnauthorizedException('Email incorreto')
        }
        await this.mailer.sendMail({
            subject:'Recuperação de Senha',
            to:'leonardo@terainfor.com.br',
            template: 'forget',
            context:{
                name: user.nome
            }
        })
        return true;
    }

    async reset(password: string, token: string) {

        try {
            const data:any = this.jwtService.verify(token,{
                issuer:'forget'
            })

            if(isNaN(Number(data.id))) {
                throw new BadRequestException("Token é inválido")
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);

            await this.userRepository.update(Number(data.id),{
                    password
            });
            const user = await this.userService.show(Number(data.id));
            return this.createToken(user);

        } catch (e) {
            throw new BadRequestException(e)
        }
    }

    async register({ email, nome, password, birthAt, role }: AuthRegisterDTO) {
        const user = await this.userService.create({ email, nome, password, birthAt, role });
        return this.createToken(user);
    }
}