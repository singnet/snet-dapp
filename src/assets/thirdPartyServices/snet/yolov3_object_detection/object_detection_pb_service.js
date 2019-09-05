// package: 
// file: ProtoFiles/object_detection.proto

var ProtoFiles_object_detection_pb = require("./object_detection_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Detect = (function () {
  function Detect() {}
  Detect.serviceName = "Detect";
  return Detect;
}());

Detect.detect = {
  methodName: "detect",
  service: Detect,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_object_detection_pb.Input,
  responseType: ProtoFiles_object_detection_pb.Output
};

exports.Detect = Detect;

function DetectClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DetectClient.prototype.detect = function detect(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Detect.detect, {
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

exports.DetectClient = DetectClient;

