// package: timeSeriesAnomalyDetection
// file: ProtoFiles/timeSeriesAnomalyDetection.proto

var ProtoFiles_timeSeriesAnomalyDetection_pb = require("./timeSeriesAnomalyDetection_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var EfficientRuleDensityBasedAnomalyDetection = (function () {
  function EfficientRuleDensityBasedAnomalyDetection() {}
  EfficientRuleDensityBasedAnomalyDetection.serviceName = "timeSeriesAnomalyDetection.EfficientRuleDensityBasedAnomalyDetection";
  return EfficientRuleDensityBasedAnomalyDetection;
}());

EfficientRuleDensityBasedAnomalyDetection.detectAnomalies = {
  methodName: "detectAnomalies",
  service: EfficientRuleDensityBasedAnomalyDetection,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_timeSeriesAnomalyDetection_pb.InputParameters,
  responseType: ProtoFiles_timeSeriesAnomalyDetection_pb.OutputString
};

exports.EfficientRuleDensityBasedAnomalyDetection = EfficientRuleDensityBasedAnomalyDetection;

function EfficientRuleDensityBasedAnomalyDetectionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EfficientRuleDensityBasedAnomalyDetectionClient.prototype.detectAnomalies = function detectAnomalies(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(EfficientRuleDensityBasedAnomalyDetection.detectAnomalies, {
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

exports.EfficientRuleDensityBasedAnomalyDetectionClient = EfficientRuleDensityBasedAnomalyDetectionClient;

