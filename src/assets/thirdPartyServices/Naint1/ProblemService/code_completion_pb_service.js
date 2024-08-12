// package: code_completion
// file: code_completion.proto

var code_completion_pb = require("./code_completion_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ServiceDefinition = (function () {
  function ServiceDefinition() {}
  ServiceDefinition.serviceName = "code_completion.ServiceDefinition";
  return ServiceDefinition;
})();

ServiceDefinition.generate_code = {
  methodName: "generate_code",
  service: ServiceDefinition,
  requestStream: false,
  responseStream: false,
  requestType: code_completion_pb.input_code,
  responseType: code_completion_pb.output_code,
};

exports.ServiceDefinition = ServiceDefinition;

function ServiceDefinitionClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ServiceDefinitionClient.prototype.generate_code = function generate_code(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ServiceDefinition.generate_code, {
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

exports.ServiceDefinitionClient = ServiceDefinitionClient;
