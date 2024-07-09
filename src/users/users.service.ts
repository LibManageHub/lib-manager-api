import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponse} from "../common/responses/paginated-response";
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAllUsers(page: number = 1, pageSize: number = 10) {
    const users = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    const total = await this.prisma.user.count();
    return new PaginatedResponse(users, total, page, pageSize);
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
