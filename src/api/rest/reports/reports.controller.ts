import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ROUTES } from 'src/common/routes/routes';
import { Roles } from 'src/api/graphql/auth/decorators/roles.decorator';
import { RoleEnum } from 'prisma/generated/prisma';

@Controller(ROUTES.REPORTS.ROOT)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Roles(RoleEnum.ADMIN)
  @Get(ROUTES.REPORTS.ARTICLES_REPORT)
  getArticlesReport() {
    return this.reportsService.getArticlesReport();
  }
}
