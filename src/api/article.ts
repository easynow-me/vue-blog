import { ArticleClient } from '@/protos/article_pb_service';
import { QueryReq, ArticleDto } from '@/protos/article_pb';

const client = new ArticleClient(
  process.env.VUE_APP_BLOG_BASE_API || 'https://localhost:5001'
);

export class PagedList<T> {
  public pageNumber!: number;
  public pageSize!: number;
  public items!: T[];
}

export function queryArticle(query: QueryReq.AsObject) {
  return new Promise<PagedList<ArticleDto.AsObject>>((resolve, reject) => {
    const req = new QueryReq();
    req.setPagenumber(query.pagenumber);
    req.setPagesize(query.pagesize);
    client.query(req, (err, resp) => {
      if (resp) {
        if (resp.getItemsList()) {
          resolve({
            pageNumber: resp.getPagenumber(),
            pageSize: resp.getPagesize(),
            items: resp
              .getItemsList()
              .map(item => {
                return (item.unpack(
                  ArticleDto.deserializeBinary,
                  item.getTypeName()
                ) as ArticleDto).toObject();
              })
              .filter(item => {
                return item !== null;
              })
          });
        }
      }
      reject(err);
    });
  });
}
