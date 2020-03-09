// package: EasyNow.Blog
// file: src/protos/article.proto

import * as jspb from "google-protobuf";
import * as src_protos_resultReply_pb from "../../src/protos/resultReply_pb";

export class AddReq extends jspb.Message {
  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddReq.AsObject;
  static toObject(includeInstance: boolean, msg: AddReq): AddReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AddReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddReq;
  static deserializeBinaryFromReader(message: AddReq, reader: jspb.BinaryReader): AddReq;
}

export namespace AddReq {
  export type AsObject = {
    title: string,
    content: string,
  }
}

export class EditReq extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EditReq.AsObject;
  static toObject(includeInstance: boolean, msg: EditReq): EditReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EditReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EditReq;
  static deserializeBinaryFromReader(message: EditReq, reader: jspb.BinaryReader): EditReq;
}

export namespace EditReq {
  export type AsObject = {
    id: string,
    title: string,
    content: string,
  }
}

export class DeleteReq extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteReq.AsObject;
  static toObject(includeInstance: boolean, msg: DeleteReq): DeleteReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeleteReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeleteReq;
  static deserializeBinaryFromReader(message: DeleteReq, reader: jspb.BinaryReader): DeleteReq;
}

export namespace DeleteReq {
  export type AsObject = {
    id: string,
  }
}

export class QueryReq extends jspb.Message {
  getPagenumber(): number;
  setPagenumber(value: number): void;

  getPagesize(): number;
  setPagesize(value: number): void;

  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryReq.AsObject;
  static toObject(includeInstance: boolean, msg: QueryReq): QueryReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryReq;
  static deserializeBinaryFromReader(message: QueryReq, reader: jspb.BinaryReader): QueryReq;
}

export namespace QueryReq {
  export type AsObject = {
    pagenumber: number,
    pagesize: number,
    id: string,
  }
}

export class ArticleReply extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getContent(): string;
  setContent(value: string): void;

  getUpdator(): string;
  setUpdator(value: string): void;

  getCreatetime(): string;
  setCreatetime(value: string): void;

  getUpdatetime(): string;
  setUpdatetime(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArticleReply.AsObject;
  static toObject(includeInstance: boolean, msg: ArticleReply): ArticleReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ArticleReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArticleReply;
  static deserializeBinaryFromReader(message: ArticleReply, reader: jspb.BinaryReader): ArticleReply;
}

export namespace ArticleReply {
  export type AsObject = {
    id: string,
    title: string,
    content: string,
    updator: string,
    createtime: string,
    updatetime: string,
  }
}

