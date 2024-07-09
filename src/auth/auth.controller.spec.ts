import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dtos/create-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register with correct params', async () => {
      const createUserDto: CreateUserDto = {
        username: 'tester',
        password: 'password',
        email: 'test@example.com',
        name: 'Test User',
      };

      await authController.register(createUserDto);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('login', () => {
    it('should call authService.login with correct params', async () => {
      const req = {
        user: {
          username: 'tester',
          userId: 1,
          role: 'USER',
        },
      };

      await authController.login(req);
      expect(authService.login).toHaveBeenCalledWith(req.user);
    });
  });
});
