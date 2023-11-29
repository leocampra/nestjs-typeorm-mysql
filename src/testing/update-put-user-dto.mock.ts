import { Role } from "../enums/role.enum";
import { UpdateUserDTO } from "../user/dto/update-user.dto";

export const updatePutUserDTO:UpdateUserDTO = {
    email:"leonardo@axenya.com", 
    nome:"Leonardo", 
    password:"$2b$10$eDHNQa/eJK4bkPrHRIn5/.iICIr7SYroYJSddwcHR.KWy9V2vvHsW", 
    birthAt:new Date("2023-11-20"), 
    role:Role.User
  };