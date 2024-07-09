import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'john_doe',
        password: 'password123',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'USER',
      };

      jest.spyOn(userService, 'createUser').mockResolvedValue(createUserDto as any);

      expect(await controller.create(createUserDto)).toBe(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, username: 'john_doe', password: 'password123', name: 'John Doe', email: 'john@example.com', role: 'USER' },
        { id: 2, username: 'jane_smith', password: 'password456', name: 'Jane Smith', email: 'jane@example.com', role: 'USER' },
      ];

      jest.spyOn(userService, 'findAllUsers').mockResolvedValue(users as any);

      expect(await controller.findAll()).toBe(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userId = 1;
      const user = { id: userId, username: 'john_doe', password: 'password123', name: 'John Doe', email: 'john@example.com', role: 'USER' };

      jest.spyOn(userService, 'findUserById').mockResolvedValue(user as any);

      expect(await controller.findOne(userId)).toBe(user);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const userId = 1;
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      const updatedUser = { id: userId, username: 'john_doe', password: 'password123', name: 'Updated Name', email: 'john@example.com', role: 'USER' };

      jest.spyOn(userService, 'updateUser').mockResolvedValue(updatedUser as any);

      expect(await controller.update(userId, updateUserDto)).toBe(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user by ID', async () => {
      const userId = 1;
      const deletedUser = { id: userId, username: 'john_doe', password: 'password123', name: 'John Doe', email: 'john@example.com', role: 'USER' };

      jest.spyOn(userService, 'deleteUser').mockResolvedValue(deletedUser as any);

      expect(await controller.remove(userId)).toBe(deletedUser);
    });
  });
});
