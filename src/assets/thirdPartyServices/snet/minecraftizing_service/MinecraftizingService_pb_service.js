// package: MinecraftizingService
// file: MinecraftizingService.proto

var MinecraftizingService_pb = require("./MinecraftizingService_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MinecraftizingService = (function () {
  function MinecraftizingService() {}
  MinecraftizingService.serviceName = "MinecraftizingService.MinecraftizingService";
  return MinecraftizingService;
}());

MinecraftizingService.getMinecraftiziedImage = {
  methodName: "getMinecraftiziedImage",
  service: MinecraftizingService,
  requestStream: false,
  responseStream: false,
  requestType: MinecraftizingService_pb.minecraftRequest,
  responseType: MinecraftizingService_pb.minecraftResponse
};

exports.MinecraftizingService = MinecraftizingService;

function MinecraftizingServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MinecraftizingServiceClient.prototype.getMinecraftiziedImage = function getMinecraftiziedImage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MinecraftizingService.getMinecraftiziedImage, {
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

exports.MinecraftizingServiceClient = MinecraftizingServiceClient;

