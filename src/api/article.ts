import { ArticleClient } from '@/protos/article_pb_service';
import { QueryReq, ArticleReply } from '@/protos/article_pb';
import { copyValueToGrpcMsg } from '@/utils';
import { PagedList } from '@/protos/pagedList_pb';
import * as gpap from 'google-protobuf/google/protobuf/any_pb';

const client = new ArticleClient(
  process.env.VUE_APP_BLOG_BASE_API || 'https://localhost:5001'
);

export class PageList<T> {
  public pageNumber!: number;
  public pageSize!: number;
  public items!: T[];
}

export function queryArticle(query: QueryReq.AsObject) {
  return new Promise<PageList<ArticleReply.AsObject>>((resolve, reject) => {
    const req = new QueryReq();
    copyValueToGrpcMsg(query, req);
    client.query(req, (err, resp) => {
      if (resp && resp.getCode()) {
        const data = resp.getData();
        if (data) {
          const list = data.unpack(
            PagedList.deserializeBinary,
            data.getTypeName()
          );
          if (list) {
            resolve({
              pageNumber: list.getPagenumber(),
              pageSize: list.getPagesize(),
              items: list
                .getItemsList()
                .map((item: gpap.Any) => {
                  return (item.unpack(
                    ArticleReply.deserializeBinary,
                    item.getTypeName()
                  ) as ArticleReply).toObject();
                })
                .filter((item: ArticleReply.AsObject) => {
                  return item !== null;
                })
            });
          }
        }
      }
      reject(err);
    });
  });
}
