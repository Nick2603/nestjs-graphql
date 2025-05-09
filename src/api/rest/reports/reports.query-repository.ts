import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import type { UserInfo } from './interfaces/user-info.interface';

@Injectable()
export class ReportsQueryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getUsersInfo(startDate: Date, endDate: Date): Promise<UserInfo[]> {
    return await this.prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        email: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            name: true,
          },
        },
        roles: {
          select: {
            title: true,
          },
        },
      },
    });
  }
}
