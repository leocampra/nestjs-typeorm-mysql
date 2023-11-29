import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";

export const UserEntityList: UserEntity[] = [
    {
      email:"leonardo@axenya.com", 
      nome:"Leonardo", 
      password:"$2b$10$eDHNQa/eJK4bkPrHRIn5/.iICIr7SYroYJSddwcHR.KWy9V2vvHsW", 
      birthAt:new Date("2023-11-20"), 
      role:Role.User
    },
    {
      email:"joao@axenya.com", 
      nome:"João", 
      password:"$2b$10$eDHNQa/eJK4bkPrHRIn5/.iICIr7SYroYJSddwcHR.KWy9V2vvHsW", 
      birthAt:new Date("2023-11-20"), 
      role:Role.Admin
    },
    {
      email:"maria@axenya.com", 
      nome:"Maria", 
      password:"$2b$10$eDHNQa/eJK4bkPrHRIn5/.iICIr7SYroYJSddwcHR.KWy9V2vvHsW", 
      birthAt:new Date("2023-11-20"), 
      role:Role.User
    }
  ];