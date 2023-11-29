import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/dto/create-user.dto";

export const createUserDTO:CreateUserDTO = {
    email:"leonardo@axenya.com", 
    nome:"Leonardo", 
    password:"$2b$10$eDHNQa/eJK4bkPrHRIn5/.iICIr7SYroYJSddwcHR.KWy9V2vvHsW", 
    birthAt:new Date("2023-11-20"), 
    role:Role.User
  };