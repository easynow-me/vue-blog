// package: EasyNow.Common
// file: src/protos/resultReply.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class ResultReply extends jspb.Message {
  getCode(): boolean;
  setCode(value: boolean): void;

  getMsg(): string;
  setMsg(value: string): void;

  hasData(): boolean;
  clearData(): void;
  getData(): google_protobuf_any_pb.Any | undefined;
  setData(value?: google_protobuf_any_pb.Any): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResultReply.AsObject;
  static toObject(includeInstance: boolean, msg: ResultReply): ResultReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResultReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResultReply;
  static deserializeBinaryFromReader(message: ResultReply, reader: jspb.BinaryReader): ResultReply;
}

export namespace ResultReply {
  export type AsObject = {
    code: boolean,
    msg: string,
    data?: google_protobuf_any_pb.Any.AsObject,
  }
}

