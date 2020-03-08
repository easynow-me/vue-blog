// package: blog
// file: src/protos/article.proto

import * as jspb from 'google-protobuf';
import * as src_protos_pagedList_pb from './pagedList_pb';

export class QueryReq extends jspb.Message {
  getPagenumber(): number;
  setPagenumber(value: number): void;

  getPagesize(): number;
  setPagesize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryReq.AsObject;
  static toObject(includeInstance: boolean, msg: QueryReq): QueryReq.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: QueryReq,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): QueryReq;
  static deserializeBinaryFromReader(
    message: QueryReq,
    reader: jspb.BinaryReader
  ): QueryReq;
}

export namespace QueryReq {
  export type AsObject = {
    pagenumber: number;
    pagesize: number;
  };
}

export class ArticleDto extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArticleDto.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: ArticleDto
  ): ArticleDto.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: ArticleDto,
    writer: jspb.BinaryWriter
  ): void;
  static deserializeBinary(bytes: Uint8Array): ArticleDto;
  static deserializeBinaryFromReader(
    message: ArticleDto,
    reader: jspb.BinaryReader
  ): ArticleDto;
}

export namespace ArticleDto {
  export type AsObject = {
    title: string;
    content: string;
  };
}
