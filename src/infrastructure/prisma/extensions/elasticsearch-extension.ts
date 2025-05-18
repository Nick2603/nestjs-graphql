import { type Article, Prisma } from 'prisma/generated/prisma';
import type { AppElasticsearchService } from 'src/infrastructure/elasticsearch/app-elasticsearch.service';

export function getElasticsearchExtension(
  appElasticsearchService: AppElasticsearchService,
) {
  return {
    name: 'elasticsearch-extension',
    model: {
      article: {
        async createWithESSync(
          args: Prisma.ArticleCreateArgs,
        ): Promise<Article> {
          const context = Prisma.getExtensionContext(this);

          const nameIndex = context.name.toLowerCase();

          const result: Article = await context.create(args);

          await appElasticsearchService.createDocument(nameIndex, result.id, {
            text: result.text,
            genres: result.genres,
          });

          return result;
        },
        async updateWithESSync(
          args: Prisma.ArticleUpdateArgs,
        ): Promise<Article> {
          const context = Prisma.getExtensionContext(this);

          const nameIndex = context.name.toLowerCase();

          const result: Article = await context.update(args);

          await appElasticsearchService.updateDocument(nameIndex, result.id, {
            text: result.text,
            genres: result.genres,
          });

          return result;
        },
        async deleteWithESSync(
          args: Prisma.ArticleDeleteArgs,
        ): Promise<Article> {
          const context = Prisma.getExtensionContext(this);

          const nameIndex = context.name.toLowerCase();

          const result: Article = await context.delete(args);

          await appElasticsearchService.deleteDocument(nameIndex, result.id);

          return result;
        },
      },
    },
  };
}
