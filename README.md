## 简介
前端使用ElementUI、TypeScript、Grpc-Web实现个人博客，基本框架照搬 [PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

后端使用ASP.NET Core 3.1、Grpc、Jwt、EF Core、Mysql

服务器使用k3s搭建集群，Rancher作为管理面板

## 演示站点

- [博客前端](https://www.easynow.me)
- [Grpc后端](https://blog.easynow.me)


## Proto文件

article.protobuf
```protobufsyntax = "proto3";

import "src/protos/resultReply.proto";

package EasyNow.Blog;

service Article {
  rpc Query (QueryReq) returns (EasyNow.Common.ResultReply);
  rpc Add (AddReq) returns (EasyNow.Common.ResultReply);
  rpc Edit (EditReq) returns (EasyNow.Common.ResultReply);
  rpc Delete (DeleteReq) returns (EasyNow.Common.ResultReply);
}

message AddReq {
    string title = 1;
    string content = 2;
}

message EditReq {
    string id = 1;
    string title = 2;
    string content = 3;
}

message DeleteReq {
    string id = 1;
}

message QueryReq {
  int32 pageNumber = 1;
  int32 pageSize = 2;
  string id = 3;
}

message ArticleReply {
    string id = 1;
    string title = 2;
    string content = 3;
    string updator = 4;
    string createTime = 5;
    string updateTime = 6;
}
```

pagedList.proto
```protobuf
syntax = "proto3";

import "google/protobuf/any.proto";

package EasyNow.Common;

message PagedList {
    int32 pageNumber = 1;
    int32 pageSize = 2;
    repeated google.protobuf.Any items = 3;
}
```

resultReply.proto
```protobuf
syntax = "proto3";

import "google/protobuf/any.proto";

package EasyNow.Common;

message ResultReply {
    bool code = 1;
    string msg = 2;
    google.protobuf.Any data = 3;
}
```