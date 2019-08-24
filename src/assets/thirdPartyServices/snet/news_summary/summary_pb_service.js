// package: 
// file: ProtoFiles/summary.proto

var ProtoFiles_summary_pb = require("./summary_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TextSummary = (function () {
  function TextSummary() {}
  TextSummary.serviceName = "TextSummary";
  return TextSummary;
}());

TextSummary.summary = {
  methodName: "summary",
  service: TextSummary,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_summary_pb.Request,
  responseType: ProtoFiles_summary_pb.Result
};

exports.TextSummary = TextSummary;

function TextSummaryClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TextSummaryClient.prototype.summary = function summary(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TextSummary.summary, {
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

exports.TextSummaryClient = TextSummaryClient;

