// package: 
// file: face_recognition.proto

var face_recognition_pb = require("./face_recognition_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var FaceRecognition = (function () {
  function FaceRecognition() {}
  FaceRecognition.serviceName = "FaceRecognition";
  return FaceRecognition;
}());

FaceRecognition.RecogniseFace = {
  methodName: "RecogniseFace",
  service: FaceRecognition,
  requestStream: false,
  responseStream: false,
  requestType: face_recognition_pb.FaceRecognitionRequest,
  responseType: face_recognition_pb.FaceRecognitionResponse
};

FaceRecognition.RecogniseFacePrealigned = {
  methodName: "RecogniseFacePrealigned",
  service: FaceRecognition,
  requestStream: false,
  responseStream: false,
  requestType: face_recognition_pb.FaceRecognitionRequest,
  responseType: face_recognition_pb.FaceRecognitionResponse
};

exports.FaceRecognition = FaceRecognition;

function FaceRecognitionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FaceRecognitionClient.prototype.recogniseFace = function recogniseFace(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FaceRecognition.RecogniseFace, {
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

FaceRecognitionClient.prototype.recogniseFacePrealigned = function recogniseFacePrealigned(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FaceRecognition.RecogniseFacePrealigned, {
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

exports.FaceRecognitionClient = FaceRecognitionClient;

