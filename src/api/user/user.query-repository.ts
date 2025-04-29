import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import type { User } from '@prisma/client';
import type { GetUserArgs } from './dto/get-user.args';

@Injectable()
export class UserQueryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  /**
   * Throws NotFoundException if user is not found.
   */
  async getUser({ id }: GetUserArgs): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }
}
