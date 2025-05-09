import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { ReportsQueryRepository } from './reports.query-repository';
import { ExcelJsService } from './excel-js.service';

@Module({
  imports: [PrismaModule],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsQueryRepository, ExcelJsService],
})
export class ReportsModule {}
