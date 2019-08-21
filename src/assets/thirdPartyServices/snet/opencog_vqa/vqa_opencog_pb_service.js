// package: 
// file: vqa_opencog.proto



var vqa_opencog_pb = require("./vqa_opencog_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var VqaService = (function () {
  function VqaService() {}
  VqaService.serviceName = "VqaService";
  return VqaService;
}());

VqaService.answer = {
  methodName: "answer",
  service: VqaService,
  requestStream: false,
  responseStream: false,
  requestType: vqa_opencog_pb.VqaRequest,
  responseType: vqa_opencog_pb.VqaResponse
};

exports.VqaService = VqaService;

function VqaServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

VqaServiceClient.prototype.answer = function answer(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(VqaService.answer, {
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

exports.VqaServiceClient = VqaServiceClient;

