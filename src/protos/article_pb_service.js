/* eslint-disable prefer-rest-params */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-var-requires */
// package: blog
// file: src/protos/article.proto

const src_protos_article_pb = require('./article_pb');
const src_protos_pagedList_pb = require('./pagedList_pb');
const grpc = require('@improbable-eng/grpc-web').grpc;

const Article = (function() {
  function Article() {}
  Article.serviceName = 'blog.Article';
  return Article;
})();

Article.Query = {
  methodName: 'Query',
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

ArticleClient.prototype.query = function query(
  requestMessage,
  metadata,
  callback
) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  const client = grpc.unary(Article.Query, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function(response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          const err = new Error(response.statusMessage);
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
    cancel: function() {
      callback = null;
      client.close();
    }
  };
};

exports.ArticleClient = ArticleClient;
