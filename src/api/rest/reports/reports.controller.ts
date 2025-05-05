import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ROUTES } from 'src/common/routes/routes';

@Controller(ROUTES.REPORTS.ROOT)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(ROUTES.REPORTS.ARTICLES_REPORT)
  getArticlesReport() {
    return this.reportsService.getArticlesReport();
  }
}
