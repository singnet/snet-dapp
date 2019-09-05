// package: pneumonia_diagnosis
// file: pneumonia_diagnosis.proto

var pneumonia_diagnosis_pb = require("./pneumonia_diagnosis_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Diagnosis = (function () {
  function Diagnosis() {}
  Diagnosis.serviceName = "pneumonia_diagnosis.Diagnosis";
  return Diagnosis;
}());

Diagnosis.check = {
  methodName: "check",
  service: Diagnosis,
  requestStream: false,
  responseStream: false,
  requestType: pneumonia_diagnosis_pb.Input,
  responseType: pneumonia_diagnosis_pb.Output
};

exports.Diagnosis = Diagnosis;

function DiagnosisClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DiagnosisClient.prototype.check = function check(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Diagnosis.check, {
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

exports.DiagnosisClient = DiagnosisClient;

