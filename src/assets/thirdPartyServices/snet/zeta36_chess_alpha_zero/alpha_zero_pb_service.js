// package: 
// file: ProtoFiles/alpha_zero.proto

var ProtoFiles_alpha_zero_pb = require("./alpha_zero_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var AlphaZero = (function () {
  function AlphaZero() {}
  AlphaZero.serviceName = "AlphaZero";
  return AlphaZero;
}());

AlphaZero.play = {
  methodName: "play",
  service: AlphaZero,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_alpha_zero_pb.Input,
  responseType: ProtoFiles_alpha_zero_pb.Output
};

exports.AlphaZero = AlphaZero;

function AlphaZeroClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

AlphaZeroClient.prototype.play = function play(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(AlphaZero.play, {
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

exports.AlphaZeroClient = AlphaZeroClient;

