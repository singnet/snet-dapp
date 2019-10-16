// package: opencog_services
// file: opencog.proto

var opencog_pb = require("./opencog_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var OpencogServices = (function () {
  function OpencogServices() {}
  OpencogServices.serviceName = "opencog_services.OpencogServices";
  return OpencogServices;
}());

OpencogServices.Execute = {
  methodName: "Execute",
  service: OpencogServices,
  requestStream: false,
  responseStream: false,
  requestType: opencog_pb.Command,
  responseType: opencog_pb.CommandOutput
};

OpencogServices.AsynchronousTask = {
  methodName: "AsynchronousTask",
  service: OpencogServices,
  requestStream: false,
  responseStream: false,
  requestType: opencog_pb.Command,
  responseType: opencog_pb.CommandOutput
};

exports.OpencogServices = OpencogServices;

function OpencogServicesClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

OpencogServicesClient.prototype.execute = function execute(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(OpencogServices.Execute, {
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

OpencogServicesClient.prototype.asynchronousTask = function asynchronousTask(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(OpencogServices.AsynchronousTask, {
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

exports.OpencogServicesClient = OpencogServicesClient;

