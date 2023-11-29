import { ExecutionContext, NotFoundException, createParamDecorator } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

export const User = createParamDecorator((filter:string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if(request.body){
        if(filter) {
            return request.body[filter]
        }
        return request.body
    } 
        throw new NotFoundException("Usuário não encontrado")
    
    
})