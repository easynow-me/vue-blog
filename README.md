## 简介
前端使用ElementUI、TypeScript、Grpc-Web实现个人博客，基本框架照搬 [PanJiaChen/vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

后端使用ASP.NET Core 3.1、Grpc、Jwt、EF Core、Mysql

服务器使用k3s搭建集群，Rancher作为管理面板

## 演示站点

- [博客前端](https://www.easynow.me)
- [Grpc后端](https://blog.easynow.me)


## Proto文件

article.protobuf
```proto
syntax = "proto3";

import "pagedList.proto";

package blog;

service Article {
  rpc Query (QueryReq) returns (blog.PagedList);
  rpc Add (AddReq) returns (ArticleReply);
}

message AddReq {
    string title = 1;
    string content = 2;
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

package blog;

message PagedList {
    int32 pageNumber = 1;
    int32 pageSize = 2;
    repeated google.protobuf.Any items = 3;
}

```