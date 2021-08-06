// package: covid
// file: src/assets/thirdPartyServices/rejuve/covid-detection/cough_test.proto

var src_assets_thirdPartyServices_rejuve_covid_detection_cough_test_pb = require("./cough_test_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var COVID = (function() {
  function COVID() {}
  COVID.serviceName = "covid.COVID";
  return COVID;
})();

COVID.s2t = {
  methodName: "s2t",
  service: COVID,
  requestStream: false,
  responseStream: false,
  requestType: src_assets_thirdPartyServices_rejuve_covid_detection_cough_test_pb.Audio,
  responseType: src_assets_thirdPartyServices_rejuve_covid_detection_cough_test_pb.Text,
};

exports.COVID = COVID;

function COVIDClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

COVIDClient.prototype.s2t = function s2t(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(COVID.s2t, {
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

exports.COVIDClient = COVIDClient;
