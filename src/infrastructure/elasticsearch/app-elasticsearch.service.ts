import type {
  Id,
  IndicesCreateResponse,
  QueryDslQueryContainer,
  Result,
} from '@elastic/elasticsearch/lib/api/types';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppElasticsearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async getDocuments<T>(
    index: string,
    match: QueryDslQueryContainer['match'],
  ): Promise<(T & { _id: Id })[]> {
    return await this.elasticsearchService.helpers.search<T>({
      index,
      query: {
        match,
      },
    });
  }

  async getDocument<T>(index: string, id: string): Promise<T | undefined> {
    const { _source } = await this.elasticsearchService.get<T>({
      index,
      id,
    });

    return _source;
  }

  async createDocument<T>(
    index: string,
    id: string,
    document: T,
  ): Promise<Result> {
    const { result } = await this.elasticsearchService.index<T>({
      index,
      id,
      document,
    });

    return result;
  }

  async updateDocument<T>(index: string, id: string, doc: T): Promise<Result> {
    const { result } = await this.elasticsearchService.update<T>({
      index,
      id,
      doc,
    });

    return result;
  }

  async deleteDocument(index: string, id: string): Promise<Result> {
    const { result } = await this.elasticsearchService.delete({ index, id });

    return result;
  }

  async checkIndicesExists(index: string): Promise<boolean> {
    return await this.elasticsearchService.indices.exists({ index });
  }

  async createIndices(index: string): Promise<IndicesCreateResponse> {
    return await this.elasticsearchService.indices.create({ index });
  }
}
