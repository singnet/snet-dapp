// package: asr
// file: ProtoFiles/asr.proto

var ProtoFiles_asr_pb = require("./asr_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ASR = (function () {
  function ASR() {}
  ASR.serviceName = "asr.ASR";
  return ASR;
}());

ASR.s2t = {
  methodName: "s2t",
  service: ASR,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_asr_pb.Audio,
  responseType: ProtoFiles_asr_pb.Text
};

exports.ASR = ASR;

function ASRClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ASRClient.prototype.s2t = function s2t(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ASR.s2t, {
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

exports.ASRClient = ASRClient;

