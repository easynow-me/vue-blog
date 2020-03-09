import { ArticleClient } from '@/protos/article_pb_service';
import {
  QueryReq,
  ArticleReply,
  AddReq,
  EditReq,
  DeleteReq
} from '@/protos/article_pb';
import { copyValueToGrpcMsg, getPageList, getData } from '@/utils';

const client = new ArticleClient(
  process.env.VUE_APP_BLOG_BASE_API || 'https://localhost:5001'
);

export function queryArticle(query: QueryReq.AsObject) {
  const req = new QueryReq();
  copyValueToGrpcMsg(query, req);
  return getPageList<ArticleReply, QueryReq, ArticleReply.AsObject>(
    req,
    client.query.bind(client),
    ArticleReply.deserializeBinary
  );
}

export function AddArticle(addReq: AddReq.AsObject) {
  const req = new AddReq();
  copyValueToGrpcMsg(addReq, req);
  return getData<ArticleReply, AddReq, ArticleReply.AsObject>(
    req,
    client.add.bind(client),
    ArticleReply.deserializeBinary
  );
}

export function EditArticle(editReq: EditReq.AsObject) {
  const req = new EditReq();
  copyValueToGrpcMsg(editReq, req);
  return getData<ArticleReply, EditReq, ArticleReply.AsObject>(
    req,
    client.edit.bind(client),
    ArticleReply.deserializeBinary
  );
}

// export function DeleteArticle(deleteReq: DeleteReq.AsObject) {
//   const req = new DeleteReq();
//   copyValueToGrpcMsg(deleteReq, req);
//   return getData<ArticleReply,DeleteReq,ArticleReply.AsObject>(req,client.delete.bind(client),ArticleReply.deserializeBinary);
// }
