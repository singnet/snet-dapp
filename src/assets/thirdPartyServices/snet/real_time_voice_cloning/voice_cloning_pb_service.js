// package: 
// file: voice_cloning.proto

var voice_cloning_pb = require("./voice_cloning_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RealTimeVoiceCloning = (function () {
  function RealTimeVoiceCloning() {}
  RealTimeVoiceCloning.serviceName = "RealTimeVoiceCloning";
  return RealTimeVoiceCloning;
}());

RealTimeVoiceCloning.clone = {
  methodName: "clone",
  service: RealTimeVoiceCloning,
  requestStream: false,
  responseStream: false,
  requestType: voice_cloning_pb.Input,
  responseType: voice_cloning_pb.Output
};

exports.RealTimeVoiceCloning = RealTimeVoiceCloning;

function RealTimeVoiceCloningClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RealTimeVoiceCloningClient.prototype.clone = function clone(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RealTimeVoiceCloning.clone, {
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

exports.RealTimeVoiceCloningClient = RealTimeVoiceCloningClient;

