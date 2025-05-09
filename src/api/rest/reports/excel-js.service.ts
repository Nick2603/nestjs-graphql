import { Injectable } from '@nestjs/common';
import { Workbook, type Worksheet, type Column } from 'exceljs';

@Injectable()
export class ExcelJsService {
  createWorkBook(): Workbook {
    return new Workbook();
  }

  addWorksheet(workbook: Workbook, title: string): Worksheet {
    return workbook.addWorksheet(title);
  }

  getWorksheet(workbook: Workbook, title: string): Worksheet | undefined {
    return workbook.getWorksheet(title);
  }

  addColumns(worksheet: Worksheet, columns: Partial<Column>[]): Worksheet {
    worksheet.columns = columns;

    return worksheet;
  }

  addRow(
    worksheet: Worksheet,
    data: unknown | unknown[],
    style?: string,
  ): Worksheet {
    worksheet.addRow(data, style);

    return worksheet;
  }
}
