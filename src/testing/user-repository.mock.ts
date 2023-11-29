import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { UserEntityList } from "./user-entity-list.mock";

export const userRepositoryMock = {
    provide: getRepositoryToken(UserEntity),
    useValue:{
      exist:jest.fn().mockResolvedValue(true),
      create:jest.fn(),
      save:jest.fn().mockResolvedValue(UserEntityList[0]),
      find:jest.fn().mockResolvedValue(UserEntityList),
      findOneBy:jest.fn().mockResolvedValue(UserEntityList[0]),
      update:jest.fn(),
      delete:jest.fn()
    }
  }