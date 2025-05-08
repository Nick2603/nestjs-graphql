import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import * as ExcelJS from 'exceljs';
import type { UserInfo } from './interfaces/user-info.interface';

@Injectable()
export class ReportsService {
  private readonly ALLOWED_DIFF_DAYS: number = 31;

  private readonly WORKSHEET_NAME: string = 'Users';

  constructor(private readonly prisma: PrismaService) {}

  async getArticlesReport(
    startDate: Date,
    endDate: Date,
  ): Promise<ExcelJS.Workbook> {
    this.validateDates(startDate, endDate);

    const users = await this.getUsersInfo(
      new Date(startDate.setHours(0, 0, 0, 0)),
      new Date(endDate.setHours(23, 59, 59, 999)),
    );

    const workbook = this.generateReport();

    users.map((user, index) =>
      this.fillUserInfo(
        user,
        workbook.getWorksheet(this.WORKSHEET_NAME),
        index + 1,
      ),
    );

    return workbook;
  }

  private validateDates(startDate: Date, endDate: Date): void {
    if (startDate.getTime() > endDate.getTime())
      throw new Error('Invalid dates range');

    if (
      (endDate.getTime() - startDate.getTime()) / (1_000 * 60 * 60 * 24) >
      this.ALLOWED_DIFF_DAYS
    )
      throw new Error('Exceed allowed days range');
  }

  private async getUsersInfo(
    startDate: Date,
    endDate: Date,
  ): Promise<UserInfo[]> {
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

  private generateReport(): ExcelJS.Workbook {
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet(this.WORKSHEET_NAME);

    worksheet.columns = [
      { header: '№', key: 'index', width: 3 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Roles', key: 'roles', width: 20 },
      { header: 'Created at', key: 'createdAt', width: 15 },
      { header: 'Updated at', key: 'updatedAt', width: 15 },
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'left', vertical: 'middle' };
      });
    });

    return workbook;
  }

  private fillUserInfo(
    user: UserInfo,
    worksheet: ExcelJS.Worksheet | undefined,
    index: number,
  ): void {
    if (!worksheet) throw new Error('Worksheet is undefined');

    const roles = user.roles.map((role) => role.title).join(', ');

    worksheet.addRow({
      index,
      email: user.email,
      name: user.profile?.name ?? 'no profile',
      roles: roles.length ? roles : 'no roles',
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt.toLocaleDateString(),
    });
  }
}
