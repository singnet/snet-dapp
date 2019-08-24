// package: tts
// file: ProtoFiles/tts.proto

var ProtoFiles_tts_pb = require("./tts_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TTS = (function () {
  function TTS() {}
  TTS.serviceName = "tts.TTS";
  return TTS;
}());

TTS.t2s = {
  methodName: "t2s",
  service: TTS,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_tts_pb.Text,
  responseType: ProtoFiles_tts_pb.Audio
};

exports.TTS = TTS;

function TTSClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TTSClient.prototype.t2s = function t2s(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TTS.t2s, {
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

exports.TTSClient = TTSClient;

