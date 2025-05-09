import { Injectable } from '@nestjs/common';
import type { Workbook, Worksheet, Style } from 'exceljs';
import type { UserInfo } from './interfaces/user-info.interface';
import { ReportsQueryRepository } from './reports.query-repository';
import { ExcelJsService } from './excel-js.service';

@Injectable()
export class ReportsService {
  private readonly ALLOWED_DIFF_DAYS: number = 31;

  private readonly WORKSHEET_NAME: string = 'Users';

  private readonly columnStyles: Partial<Style> = {
    alignment: { horizontal: 'left', vertical: 'middle' },
    font: { bold: true },
  };

  constructor(
    private readonly reportsQueryRepository: ReportsQueryRepository,
    private readonly excelJsService: ExcelJsService,
  ) {}

  async getArticlesReport(startDate: Date, endDate: Date): Promise<Workbook> {
    this.validateDates(startDate, endDate);

    const users = await this.reportsQueryRepository.getUsersInfo(
      new Date(startDate.setHours(0, 0, 0, 0)),
      new Date(endDate.setHours(23, 59, 59, 999)),
    );

    const workbook = this.generateReport();

    users.map((user, index) =>
      this.fillUserInfo(
        user,
        this.excelJsService.getWorksheet(workbook, this.WORKSHEET_NAME),
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

  private generateReport(): Workbook {
    const workbook = this.excelJsService.createWorkBook();

    const worksheet = this.excelJsService.addWorksheet(
      workbook,
      this.WORKSHEET_NAME,
    );

    const columns = [
      {
        header: '№',
        key: 'index',
        width: 3,
        style: {
          ...this.columnStyles,
        },
      },
      {
        header: 'Email',
        key: 'email',
        width: 20,
        style: {
          ...this.columnStyles,
        },
      },
      {
        header: 'Name',
        key: 'name',
        width: 20,
        style: {
          ...this.columnStyles,
        },
      },
      {
        header: 'Roles',
        key: 'roles',
        width: 20,
        style: {
          ...this.columnStyles,
        },
      },
      {
        header: 'Created at',
        key: 'createdAt',
        width: 15,
        style: {
          ...this.columnStyles,
        },
      },
      {
        header: 'Updated at',
        key: 'updatedAt',
        width: 15,
        style: {
          ...this.columnStyles,
        },
      },
    ];

    this.excelJsService.addColumns(worksheet, columns);

    return workbook;
  }

  private fillUserInfo(
    user: UserInfo,
    worksheet: Worksheet | undefined,
    index: number,
  ): void {
    if (!worksheet) throw new Error('Worksheet is undefined');

    const roles = user.roles.map((role) => role.title).join(', ');

    this.excelJsService.addRow(worksheet, {
      index,
      email: user.email,
      name: user.profile?.name ?? 'no profile',
      roles: roles.length ? roles : 'no roles',
      createdAt: user.createdAt.toLocaleDateString(),
      updatedAt: user.updatedAt.toLocaleDateString(),
    });
  }
}
