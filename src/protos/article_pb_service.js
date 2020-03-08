// package: blog
// file: src/protos/article.proto

var src_protos_article_pb = require("../../src/protos/article_pb");
var src_protos_pagedList_pb = require("../../src/protos/pagedList_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Article = (function () {
  function Article() {}
  Article.serviceName = "blog.Article";
  return Article;
}());

Article.Query = {
  methodName: "Query",
  service: Article,
  requestStream: false,
  responseStream: false,
  requestType: src_protos_article_pb.QueryReq,
  responseType: src_protos_pagedList_pb.PagedList
};

exports.Article = Article;

function ArticleClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ArticleClient.prototype.query = function query(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Article.Query, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.ArticleClient = ArticleClient;

