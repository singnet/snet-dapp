// package: 
// file: ProtoFiles/video_cap.proto

var ProtoFiles_video_cap_pb = require("./video_cap_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VideoCaptioning = (function () {
  function VideoCaptioning() {}
  VideoCaptioning.serviceName = "VideoCaptioning";
  return VideoCaptioning;
}());

VideoCaptioning.video_cap = {
  methodName: "video_cap",
  service: VideoCaptioning,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_video_cap_pb.Input,
  responseType: ProtoFiles_video_cap_pb.Output
};

exports.VideoCaptioning = VideoCaptioning;

function VideoCaptioningClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VideoCaptioningClient.prototype.video_cap = function video_cap(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VideoCaptioning.video_cap, {
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

exports.VideoCaptioningClient = VideoCaptioningClient;

