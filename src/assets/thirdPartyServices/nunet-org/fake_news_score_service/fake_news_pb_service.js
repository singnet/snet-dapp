/* eslint-disable */
// package:
// file: fake_news.proto


var fake_news_pb = require("./fake_news_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var fake_news_classification = (function() {
  function fake_news_classification() {}
  fake_news_classification.serviceName = "fake_news_classification";
  return fake_news_classification;
})();

fake_news_classification.classify = {
  methodName: "classify",
  service: fake_news_classification,
  requestStream: false,
  responseStream: false,
  requestType: fake_news_pb.InputMessage,
  responseType: fake_news_pb.OutputMessage,
};

exports.fake_news_classification = fake_news_classification;

function fake_news_classificationClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

fake_news_classificationClient.prototype.classify = function classify(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(fake_news_classification.classify, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd(response) {
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
    },
  });
  return {
    cancel() {
      callback = null;
      client.close();
    },
  };
};

exports.fake_news_classificationClient = fake_news_classificationClient;
