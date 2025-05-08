import {
  Controller,
  Get,
  HttpStatus,
  ParseDatePipe,
  Query,
  Res,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ROUTES } from 'src/common/routes/routes';
import { Roles } from 'src/api/graphql/auth/decorators/roles.decorator';
import { RoleEnum } from 'prisma/generated/prisma';
import type { Response } from 'express';

@Controller(ROUTES.REPORTS.ROOT)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Roles(RoleEnum.ADMIN)
  @Get(ROUTES.REPORTS.ARTICLES_REPORT)
  async getArticlesReport(
    @Query(
      'startDate',
      new ParseDatePipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    startDate: Date,
    @Query(
      'endDate',
      new ParseDatePipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    endDate: Date,
    @Res() res: Response,
  ) {
    const report = await this.reportsService.getArticlesReport(
      startDate,
      endDate,
    );

    res.setHeader('Content-type', 'text/xml');

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="articles_report.xlsx"',
    );

    await report.xlsx.write(res);

    res.end();
  }
}
