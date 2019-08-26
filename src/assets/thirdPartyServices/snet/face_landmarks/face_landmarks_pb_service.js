// package: 
// file: face_landmarks.proto

var face_landmarks_pb = require("./face_landmarks_pb");
var face_common_pb = require("./face_common_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var FaceLandmark = (function () {
  function FaceLandmark() {}
  FaceLandmark.serviceName = "FaceLandmark";
  return FaceLandmark;
}());

FaceLandmark.GetLandmarks = {
  methodName: "GetLandmarks",
  service: FaceLandmark,
  requestStream: false,
  responseStream: false,
  requestType: face_landmarks_pb.FaceLandmarkRequest,
  responseType: face_landmarks_pb.FaceLandmarkResponse
};

FaceLandmark.GetLandmarkModels = {
  methodName: "GetLandmarkModels",
  service: FaceLandmark,
  requestStream: false,
  responseStream: false,
  requestType: face_landmarks_pb.Empty,
  responseType: face_common_pb.FaceLandmarkModels
};

exports.FaceLandmark = FaceLandmark;

function FaceLandmarkClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FaceLandmarkClient.prototype.getLandmarks = function getLandmarks(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FaceLandmark.GetLandmarks, {
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

FaceLandmarkClient.prototype.getLandmarkModels = function getLandmarkModels(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FaceLandmark.GetLandmarkModels, {
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

exports.FaceLandmarkClient = FaceLandmarkClient;

