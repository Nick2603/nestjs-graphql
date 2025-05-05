import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  getArticlesReport() {
    return 'articles report';
  }
}
