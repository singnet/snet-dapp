/* eslint-disable */
// package: uclnlp_service
// file: uclnlp_service.proto

var uclnlp_service_pb = require("./uclnlp_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var UCLNLPStanceClassification = (function() {
  function UCLNLPStanceClassification() {}
  UCLNLPStanceClassification.serviceName = "uclnlp_service.UCLNLPStanceClassification";
  return UCLNLPStanceClassification;
})();

UCLNLPStanceClassification.stance_classify = {
  methodName: "stance_classify",
  service: UCLNLPStanceClassification,
  requestStream: false,
  responseStream: false,
  requestType: uclnlp_service_pb.InputData,
  responseType: uclnlp_service_pb.Resp,
};

exports.UCLNLPStanceClassification = UCLNLPStanceClassification;

function UCLNLPStanceClassificationClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

UCLNLPStanceClassificationClient.prototype.stance_classify = function stance_classify(
  requestMessage,
  metadata,
  callback
) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(UCLNLPStanceClassification.stance_classify, {
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

exports.UCLNLPStanceClassificationClient = UCLNLPStanceClassificationClient;
