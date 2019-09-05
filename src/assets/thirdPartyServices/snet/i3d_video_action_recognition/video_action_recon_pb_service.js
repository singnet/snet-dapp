// package: 
// file: ProtoFiles/video_action_recon.proto

var ProtoFiles_video_action_recon_pb = require("./video_action_recon_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VideoActionRecognition = (function () {
  function VideoActionRecognition() {}
  VideoActionRecognition.serviceName = "VideoActionRecognition";
  return VideoActionRecognition;
}());

VideoActionRecognition.video_action_recon = {
  methodName: "video_action_recon",
  service: VideoActionRecognition,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_video_action_recon_pb.Input,
  responseType: ProtoFiles_video_action_recon_pb.Output
};

exports.VideoActionRecognition = VideoActionRecognition;

function VideoActionRecognitionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VideoActionRecognitionClient.prototype.video_action_recon = function video_action_recon(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VideoActionRecognition.video_action_recon, {
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

exports.VideoActionRecognitionClient = VideoActionRecognitionClient;

