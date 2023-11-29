import { Controller, Post, Body, Get, Param, Patch, Put, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { PatchUserDTO } from './dto/patch-user.dto';
import { UserService } from './user.service';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @UseGuards(ThrottlerGuard)
    @Post()
    async create(@Body() {email, nome, password, birthAt, role}:CreateUserDTO){
        return this.userService.create({email, nome, password, birthAt: birthAt ? new Date(birthAt) : null, role})
    }

    @Roles(Role.Admin)
    @Get()
    async list(){
        return this.userService.list()
    }

    @Roles(Role.Admin)
    @Get(':id')
    async show(@ParamId() id:number){
        return this.userService.show(id)
    }

    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@Body() body:PatchUserDTO, @ParamId() id:number) {
        return this.userService.updatePartial(id, body)
    }

    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() {email, nome, password, birthAt, role}:UpdateUserDTO, @ParamId() id:number){
        return this.userService.update(id, {email, nome, password, birthAt: birthAt ? new Date(birthAt) : null, role})
    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId() id:number){
        return this.userService.delete(id)
    }
}
