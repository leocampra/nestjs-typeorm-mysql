import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../enums/role.enum";
@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const {user} = context.switchToHttp().getRequest();
        const requeredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()])
        if(!requeredRoles) {
            return true;
        }
        const rolesFilted = requeredRoles.filter(role => role === user.role)
        if(rolesFilted.length > 0) {
            return true;
        } else {
            return false;
        }
    }
}