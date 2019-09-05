// package: 
// file: face_detect.proto

var face_detect_pb = require("./face_detect_pb");
var face_common_pb = require("./face_common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var FaceDetect = (function () {
  function FaceDetect() {}
  FaceDetect.serviceName = "FaceDetect";
  return FaceDetect;
}());

FaceDetect.FindFace = {
  methodName: "FindFace",
  service: FaceDetect,
  requestStream: false,
  responseStream: false,
  requestType: face_common_pb.ImageRGB,
  responseType: face_common_pb.FaceDetections
};

exports.FaceDetect = FaceDetect;

function FaceDetectClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FaceDetectClient.prototype.findFace = function findFace(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FaceDetect.FindFace, {
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

exports.FaceDetectClient = FaceDetectClient;

