// package: 
// file: ProtoFiles/sentiment_analysis_rpc.proto

var ProtoFiles_sentiment_analysis_rpc_pb = require("./sentiment_analysis_rpc_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SentimentAnalysis = (function () {
  function SentimentAnalysis() {}
  SentimentAnalysis.serviceName = "SentimentAnalysis";
  return SentimentAnalysis;
}());

SentimentAnalysis.Analyze = {
  methodName: "Analyze",
  service: SentimentAnalysis,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_sentiment_analysis_rpc_pb.InputMessage,
  responseType: ProtoFiles_sentiment_analysis_rpc_pb.OutputMessage
};

exports.SentimentAnalysis = SentimentAnalysis;

function SentimentAnalysisClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SentimentAnalysisClient.prototype.analyze = function analyze(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SentimentAnalysis.Analyze, {
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

exports.SentimentAnalysisClient = SentimentAnalysisClient;

