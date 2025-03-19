// package: pcr
// file: punctuation_capitalisation_restoration.proto

var punctuation_capitalisation_restoration_pb = require("./punctuation_capitalisation_restoration_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PCR = (function () {
  function PCR() {}
  PCR.serviceName = "pcr.PCR";
  return PCR;
}());

PCR.t2t = {
  methodName: "t2t",
  service: PCR,
  requestStream: false,
  responseStream: false,
  requestType: punctuation_capitalisation_restoration_pb.Query,
  responseType: punctuation_capitalisation_restoration_pb.Text
};

exports.PCR = PCR;

function PCRClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PCRClient.prototype.t2t = function t2t(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PCR.t2t, {
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

exports.PCRClient = PCRClient;

