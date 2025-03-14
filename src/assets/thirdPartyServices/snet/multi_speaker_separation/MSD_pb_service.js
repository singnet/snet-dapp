// package: ss
// file: MSD.proto

var MSD_pb = require("./MSD_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SS = (function () {
  function SS() {}
  SS.serviceName = "ss.SS";
  return SS;
})();

SS.separate = {
  methodName: "separate",
  service: SS,
  requestStream: false,
  responseStream: false,
  requestType: MSD_pb.Audio,
  responseType: MSD_pb.Output_Audio,
};

exports.SS = SS;

function SSClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SSClient.prototype.separate = function separate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SS.separate, {
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
    },
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    },
  };
};

exports.SSClient = SSClient;
