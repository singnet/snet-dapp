// package:
// file: colorization.proto

var colorization_pb = require("./colorization_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Colorization = (function() {
  function Colorization() {}
  Colorization.serviceName = "Colorization";
  return Colorization;
})();

Colorization.colorize = {
  methodName: "colorize",
  service: Colorization,
  requestStream: false,
  responseStream: false,
  requestType: colorization_pb.Input,
  responseType: colorization_pb.Output,
};

exports.Colorization = Colorization;

function ColorizationClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ColorizationClient.prototype.colorize = function colorize(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Colorization.colorize, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd(response) {
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
    cancel() {
      callback = null;
      client.close();
    },
  };
};

exports.ColorizationClient = ColorizationClient;
