// package: 
// file: ProtoFiles/EmotionService.proto

var ProtoFiles_EmotionService_pb = require("./EmotionService_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EmotionRecognition = (function () {
  function EmotionRecognition() {}
  EmotionRecognition.serviceName = "EmotionRecognition";
  return EmotionRecognition;
}());

EmotionRecognition.classify = {
  methodName: "classify",
  service: EmotionRecognition,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_EmotionService_pb.RecognizeRequest,
  responseType: ProtoFiles_EmotionService_pb.RecognizeResponse
};

exports.EmotionRecognition = EmotionRecognition;

function EmotionRecognitionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EmotionRecognitionClient.prototype.classify = function classify(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EmotionRecognition.classify, {
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

exports.EmotionRecognitionClient = EmotionRecognitionClient;

