import { Body, Controller, Post, UseGuards, UseInterceptors, UploadedFile, BadRequestException, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, Req } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { FileInterceptor } from "@nestjs/platform-express";
import { join } from "path";
import { FileService } from "../file/file.service";
@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService
    ) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO) {
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User('email') user) {
        let users = this.userService.existsEmail(user);
        return users
        
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: 'image/png' }),
                new MaxFileSizeValidator({ maxSize: 1024 * 50 })
            ]
        })) photo: Express.Multer.File) {
        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`)
        try {
            this.fileService.upload(photo, path);
            return { success: true }
        } catch (e) {
            throw new BadRequestException('Erro ao enviar um arquivo')
        }

    }
}