// package: Blog
// file: src/protos/article.proto

var src_protos_article_pb = require("../../src/protos/article_pb");
var src_protos_resultReply_pb = require("../../src/protos/resultReply_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Article = (function () {
  function Article() {}
  Article.serviceName = "Blog.Article";
  return Article;
}());

Article.Query = {
  methodName: "Query",
  service: Article,
  requestStream: false,
  responseStream: false,
  requestType: src_protos_article_pb.QueryReq,
  responseType: src_protos_resultReply_pb.ResultReply
};

Article.Add = {
  methodName: "Add",
  service: Article,
  requestStream: false,
  responseStream: false,
  requestType: src_protos_article_pb.AddReq,
  responseType: src_protos_resultReply_pb.ResultReply
};

Article.Edit = {
  methodName: "Edit",
  service: Article,
  requestStream: false,
  responseStream: false,
  requestType: src_protos_article_pb.EditReq,
  responseType: src_protos_resultReply_pb.ResultReply
};

Article.Delete = {
  methodName: "Delete",
  service: Article,
  requestStream: false,
  responseStream: false,
  requestType: src_protos_article_pb.DeleteReq,
  responseType: src_protos_resultReply_pb.ResultReply
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

ArticleClient.prototype.add = function add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Article.Add, {
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

ArticleClient.prototype.edit = function edit(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Article.Edit, {
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

ArticleClient.prototype.delete = function pb_delete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Article.Delete, {
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

