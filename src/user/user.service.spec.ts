import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { UserEntityList } from '../testing/user-entity-list.mock';
import { createUserDTO } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDTO } from '../testing/update-put-user-dto.mock';
import { updatePatchUserDTO } from '../testing/update-patch-user-dto.mock';

describe('UserService', () => {
  let service: UserService;
let userRepository: Repository<UserEntity>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        userRepositoryMock
      ],
      imports: []
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity))
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });
  describe('Create User', () => {
    it('method create', async () => {
      jest.spyOn(userRepository, 'exist').mockResolvedValueOnce(false)
      const user = await service.create(createUserDTO);
      expect(user).toEqual(UserEntityList[0]);
    })
  })
  describe('Read User', () => {
    it('method list', async () => {
      const user = await service.list();
      expect(user).toEqual(UserEntityList);
    });
    it('method show', async () => {
      const user = await service.show(1);
      expect(user).toEqual(UserEntityList[0]);
    })
  })
  describe('Update User', () => {
    it('method update', async () => {
      const user = await service.update(1, updatePutUserDTO);
      expect(user).toEqual(UserEntityList[0]);
    });
    it('method update Partial', async () => {
      const user = await service.updatePartial(1, updatePatchUserDTO);
      expect(user).toEqual(UserEntityList[0]);
    })
  })
  describe('Delete User', () => {
    it('method delete', async () => {
      
      const user = await service.delete(1);
      expect(user).toEqual(true);
    })
  })

});

