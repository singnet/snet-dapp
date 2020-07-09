// package: 
// file: sound_spleeter.proto

var sound_spleeter_pb = require("./sound_spleeter_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SoundSpleeter = (function () {
  function SoundSpleeter() {}
  SoundSpleeter.serviceName = "SoundSpleeter";
  return SoundSpleeter;
}());

SoundSpleeter.spleeter = {
  methodName: "spleeter",
  service: SoundSpleeter,
  requestStream: false,
  responseStream: false,
  requestType: sound_spleeter_pb.Input,
  responseType: sound_spleeter_pb.Output
};

exports.SoundSpleeter = SoundSpleeter;

function SoundSpleeterClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SoundSpleeterClient.prototype.spleeter = function spleeter(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SoundSpleeter.spleeter, {
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

exports.SoundSpleeterClient = SoundSpleeterClient;

