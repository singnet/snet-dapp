// package: 
// file: face_alignment.proto

var face_alignment_pb = require("./face_alignment_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var FaceAlignment = (function () {
  function FaceAlignment() {}
  FaceAlignment.serviceName = "FaceAlignment";
  return FaceAlignment;
}());

FaceAlignment.AlignFace = {
  methodName: "AlignFace",
  service: FaceAlignment,
  requestStream: false,
  responseStream: false,
  requestType: face_alignment_pb.FaceAlignmentRequest,
  responseType: face_alignment_pb.FaceAlignmentResponse
};

exports.FaceAlignment = FaceAlignment;

function FaceAlignmentClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FaceAlignmentClient.prototype.alignFace = function alignFace(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FaceAlignment.AlignFace, {
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

exports.FaceAlignmentClient = FaceAlignmentClient;

