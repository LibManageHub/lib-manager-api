import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'john_doe', description: 'The username of the user' })
  username?: string;

  @ApiPropertyOptional({ example: 'password123', description: 'The password of the user' })
  password?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'The full name of the user' })
  name?: string;

  @ApiPropertyOptional({ example: 'john@example.com', description: 'The email of the user' })
  email?: string;

  @ApiPropertyOptional({ enum: Role, example: Role.USER, description: 'The role of the user' })
  role?: Role;
}
