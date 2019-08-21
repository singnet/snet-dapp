// package: 
// file: ProtoFiles/LanguageDetection.proto

var ProtoFiles_LanguageDetection_pb = require("./LanguageDetection_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var LanguageDetect = (function () {
  function LanguageDetect() {}
  LanguageDetect.serviceName = "LanguageDetect";
  return LanguageDetect;
}());

LanguageDetect.infer = {
  methodName: "infer",
  service: LanguageDetect,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_LanguageDetection_pb.Input,
  responseType: ProtoFiles_LanguageDetection_pb.Output
};

exports.LanguageDetect = LanguageDetect;

function LanguageDetectClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

LanguageDetectClient.prototype.infer = function infer(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(LanguageDetect.infer, {
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

exports.LanguageDetectClient = LanguageDetectClient;

