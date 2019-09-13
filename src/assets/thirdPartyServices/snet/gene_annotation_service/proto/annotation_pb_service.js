// package:
// file: src/proto/annotation.proto

var src_proto_annotation_pb = require("./annotation_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Annotate = (function() {
  function Annotate() {}
  Annotate.serviceName = "Annotate";
  return Annotate;
})();

Annotate.Annotate = {
  methodName: "Annotate",
  service: Annotate,
  requestStream: false,
  responseStream: false,
  requestType: src_proto_annotation_pb.AnnotationRequest,
  responseType: src_proto_annotation_pb.AnnotationResponse,
};

exports.Annotate = Annotate;

function AnnotateClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AnnotateClient.prototype.annotate = function annotate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Annotate.Annotate, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function(response) {
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
    },
  });
  return {
    cancel: function() {
      callback = null;
      client.close();
    },
  };
};

exports.AnnotateClient = AnnotateClient;
