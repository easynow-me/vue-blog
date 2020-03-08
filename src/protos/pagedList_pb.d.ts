// package: blog
// file: src/protos/pagedList.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class PagedList extends jspb.Message {
  getPagenumber(): number;
  setPagenumber(value: number): void;

  getPagesize(): number;
  setPagesize(value: number): void;

  clearItemsList(): void;
  getItemsList(): Array<google_protobuf_any_pb.Any>;
  setItemsList(value: Array<google_protobuf_any_pb.Any>): void;
  addItems(value?: google_protobuf_any_pb.Any, index?: number): google_protobuf_any_pb.Any;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagedList.AsObject;
  static toObject(includeInstance: boolean, msg: PagedList): PagedList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagedList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagedList;
  static deserializeBinaryFromReader(message: PagedList, reader: jspb.BinaryReader): PagedList;
}

export namespace PagedList {
  export type AsObject = {
    pagenumber: number,
    pagesize: number,
    itemsList: Array<google_protobuf_any_pb.Any.AsObject>,
  }
}

