// package: 
// file: ProtoFiles/scene_recognition.proto

var ProtoFiles_scene_recognition_pb = require("./scene_recognition_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SceneRecognition = (function () {
  function SceneRecognition() {}
  SceneRecognition.serviceName = "SceneRecognition";
  return SceneRecognition;
}());

SceneRecognition.recognize_scene = {
  methodName: "recognize_scene",
  service: SceneRecognition,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_scene_recognition_pb.SceneRecognitionRequest,
  responseType: ProtoFiles_scene_recognition_pb.SceneRecognitionResult
};

exports.SceneRecognition = SceneRecognition;

function SceneRecognitionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SceneRecognitionClient.prototype.recognize_scene = function recognize_scene(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SceneRecognition.recognize_scene, {
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

exports.SceneRecognitionClient = SceneRecognitionClient;

