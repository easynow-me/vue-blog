// package: blog
// file: src/protos/article.proto

import * as src_protos_article_pb from "../../src/protos/article_pb";
import * as src_protos_pagedList_pb from "../../src/protos/pagedList_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ArticleQuery = {
  readonly methodName: string;
  readonly service: typeof Article;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_protos_article_pb.QueryReq;
  readonly responseType: typeof src_protos_pagedList_pb.PagedList;
};

type ArticleAdd = {
  readonly methodName: string;
  readonly service: typeof Article;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_protos_article_pb.AddReq;
  readonly responseType: typeof src_protos_article_pb.ArticleReply;
};

export class Article {
  static readonly serviceName: string;
  static readonly Query: ArticleQuery;
  static readonly Add: ArticleAdd;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ArticleClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  query(
    requestMessage: src_protos_article_pb.QueryReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_protos_pagedList_pb.PagedList|null) => void
  ): UnaryResponse;
  query(
    requestMessage: src_protos_article_pb.QueryReq,
    callback: (error: ServiceError|null, responseMessage: src_protos_pagedList_pb.PagedList|null) => void
  ): UnaryResponse;
  add(
    requestMessage: src_protos_article_pb.AddReq,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_protos_article_pb.ArticleReply|null) => void
  ): UnaryResponse;
  add(
    requestMessage: src_protos_article_pb.AddReq,
    callback: (error: ServiceError|null, responseMessage: src_protos_article_pb.ArticleReply|null) => void
  ): UnaryResponse;
}

