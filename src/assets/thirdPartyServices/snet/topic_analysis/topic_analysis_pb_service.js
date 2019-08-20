// package: 
// file: ProtoFiles/topic_analysis.proto

var ProtoFiles_topic_analysis_pb = require("./topic_analysis_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TopicAnalysis = (function () {
  function TopicAnalysis() {}
  TopicAnalysis.serviceName = "TopicAnalysis";
  return TopicAnalysis;
}());

TopicAnalysis.PLSA = {
  methodName: "PLSA",
  service: TopicAnalysis,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_topic_analysis_pb.PLSARequest,
  responseType: ProtoFiles_topic_analysis_pb.PLSAResponse
};

exports.TopicAnalysis = TopicAnalysis;

function TopicAnalysisClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TopicAnalysisClient.prototype.pLSA = function pLSA(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TopicAnalysis.PLSA, {
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

exports.TopicAnalysisClient = TopicAnalysisClient;

