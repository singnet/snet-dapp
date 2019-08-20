// package: 
// file: ProtoFiles/super_resolution.proto

var ProtoFiles_super_resolution_pb = require("./super_resolution_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SuperResolution = (function () {
  function SuperResolution() {}
  SuperResolution.serviceName = "SuperResolution";
  return SuperResolution;
}());

SuperResolution.increase_image_resolution = {
  methodName: "increase_image_resolution",
  service: SuperResolution,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_super_resolution_pb.SuperResolutionRequest,
  responseType: ProtoFiles_super_resolution_pb.Image
};

exports.SuperResolution = SuperResolution;

function SuperResolutionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SuperResolutionClient.prototype.increase_image_resolution = function increase_image_resolution(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SuperResolution.increase_image_resolution, {
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

exports.SuperResolutionClient = SuperResolutionClient;

