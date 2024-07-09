import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatedResponse } from '../common/responses/paginated-response';
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

  async findAllUsers(page?: number, pageSize?: number) {
    const actualPage = page || 1;
    const actualPageSize = pageSize || 10;

    const users = await this.prisma.user.findMany({
      skip: (actualPage - 1) * actualPageSize,
      take: actualPageSize,
    });

    const total = await this.prisma.user.count();
    const totalPages = Math.ceil(total / actualPageSize);

    const paginatedResponse = new PaginatedResponse(
      users,
      total,
      actualPage,
      totalPages,
    );

    paginatedResponse.setNavigationPages();

    return paginatedResponse;
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
