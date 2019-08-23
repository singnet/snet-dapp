// package: 
// file: ProtoFiles/CoreferenceResolutionService.proto

var ProtoFiles_CoreferenceResolutionService_pb = require("./CoreferenceResolutionService_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ResolveReference = (function () {
  function ResolveReference() {}
  ResolveReference.serviceName = "ResolveReference";
  return ResolveReference;
}());

ResolveReference.resolution = {
  methodName: "resolution",
  service: ResolveReference,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_CoreferenceResolutionService_pb.InputSentence,
  responseType: ProtoFiles_CoreferenceResolutionService_pb.ReferenceResolution
};

exports.ResolveReference = ResolveReference;

function ResolveReferenceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ResolveReferenceClient.prototype.resolution = function resolution(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ResolveReference.resolution, {
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

exports.ResolveReferenceClient = ResolveReferenceClient;

