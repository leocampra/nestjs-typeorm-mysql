import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>) { }

    async create(data: CreateUserDTO) {

        if (await this.userRepository.exist({
            where: {
                email:data.email
            }
        })) {
            throw new BadRequestException('Este e-mail já está sendo usado')
        }
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        const user = await this.userRepository.create(data)
        return this.userRepository.save(user)
    }

    async list() {
        return this.userRepository.find()
    }

    async show(id: number) {
        await this.exists(id)
        return this.userRepository.findOneBy({
            id
        })
    }

    async update(id: number, data: UpdateUserDTO) {
        await this.exists(id)
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        await this.userRepository.update(id, data)
        return this.show(id)
    }

    async updatePartial(id: number, data: PatchUserDTO) {
        await this.exists(id)
        
        if(data.password){
            data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
        }
        if (data.birthAt) {
            data.birthAt = new Date(data.birthAt)
        }
        await this.userRepository.update(id,
            data
        )

        return this.show(id)
    }

    async delete(id: number) {
        await this.exists(id)
        await this.userRepository.delete(id)
        return true
    }

    async exists(id: number) {
        if (!(await this.userRepository.exist({
            where: {
                id
            }
        }))) {
            throw new NotFoundException(`The user ${id} not found`);
        }
    }

    async existsEmail(email: string) {
        try {
            return this.userRepository.findOne({
                where: {
                    email
                }
            })
        } catch (e) {
            throw new NotFoundException(`The user ${email} not found`);
        }
        
    }
}
