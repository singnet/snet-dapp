// package: ss_bert
// file: ProtoFiles/ss_bert.proto

var ProtoFiles_ss_bert_pb = require("./ss_bert_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SSBERT = (function () {
  function SSBERT() {}
  SSBERT.serviceName = "ss_bert.SSBERT";
  return SSBERT;
}());

SSBERT.ss_bert = {
  methodName: "ss_bert",
  service: SSBERT,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_ss_bert_pb.Sentences,
  responseType: ProtoFiles_ss_bert_pb.Answer
};

exports.SSBERT = SSBERT;

function SSBERTClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SSBERTClient.prototype.ss_bert = function ss_bert(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SSBERT.ss_bert, {
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

exports.SSBERTClient = SSBERTClient;

