import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { userRepositoryMock } from "../testing/user-repository.mock"
import { jwtServicemock } from "../testing/jwt-service.mock"
import { userServiceMock } from "../testing/user-service.mock"
import { mailerServiceMock } from "../testing/mailer-service.mock"
import { UserEntityList } from "../testing/user-entity-list.mock"
import { accessToken } from "../testing/access-token.mock"
import { jwtPayload } from "../testing/jwt-payload.mock"

describe('AuthService', () => {
    let authService = AuthService;
    
    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                AuthService,
                userRepositoryMock,
                jwtServicemock,
                userServiceMock,
                mailerServiceMock
            ]
        }).compile();
        authService = module.get<AuthService>(AuthService);
        console.log(typeof AuthService)
    });
    it('should be defined', () => {
        expect(authService).toBeDefined();
      });

    describe('Token', () => {
        it('createToken method', () => {
            const result = authService.createToken(UserEntityList[0])
            console.log(result)
            expect(result).toEqual({accessToken})
        });

        it('checkToken method', () => {
            const result = authService.checkToken(accessToken)
            expect(result).toEqual(jwtPayload)
        });

        it('isvalidToken method', () => {
            const result = authService.isvalidToken(accessToken)
            expect(result).toEqual(jwtPayload)
        });
    });
    describe('Autenticação', () => {});
})