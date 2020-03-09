import { ArticleClient } from '@/protos/article_pb_service';
import { QueryReq, ArticleReply } from '@/protos/article_pb';
import { copyValueToGrpcMsg } from '@/utils';

const client = new ArticleClient(
  process.env.VUE_APP_BLOG_BASE_API || 'https://localhost:5001'
);

export class PagedList<T> {
  public pageNumber!: number;
  public pageSize!: number;
  public items!: T[];
}

export function queryArticle(query: QueryReq.AsObject) {
  return new Promise<PagedList<ArticleReply.AsObject>>((resolve, reject) => {
    const req = new QueryReq();
    copyValueToGrpcMsg(query, req);
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
                  ArticleReply.deserializeBinary,
                  item.getTypeName()
                ) as ArticleReply).toObject();
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
