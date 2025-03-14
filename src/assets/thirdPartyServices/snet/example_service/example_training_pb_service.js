// package: example_service
// file: example_training.proto

var example_training_pb = require("./example_training_pb");
var pricing_pb = require("./pricing_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ServiceExample = (function () {
  function ServiceExample() {}
  ServiceExample.serviceName = "example_service.ServiceExample";
  return ServiceExample;
})();

ServiceExample.call = {
  methodName: "call",
  service: ServiceExample,
  requestStream: false,
  responseStream: false,
  requestType: example_training_pb.Query,
  responseType: example_training_pb.Answer,
};

ServiceExample.callWithModelID = {
  methodName: "callWithModelID",
  service: ServiceExample,
  requestStream: false,
  responseStream: false,
  requestType: example_training_pb.QueryWithModelID,
  responseType: example_training_pb.Answer,
};

ServiceExample.callDynamicPricing = {
  methodName: "callDynamicPricing",
  service: ServiceExample,
  requestStream: false,
  responseStream: false,
  requestType: example_training_pb.Query,
  responseType: example_training_pb.Answer,
};

ServiceExample.dynamic_pricing_add = {
  methodName: "dynamic_pricing_add",
  service: ServiceExample,
  requestStream: false,
  responseStream: false,
  requestType: example_training_pb.Query,
  responseType: pricing_pb.PriceInCogs,
};

exports.ServiceExample = ServiceExample;

function ServiceExampleClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ServiceExampleClient.prototype.call = function call(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ServiceExample.call, {
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

ServiceExampleClient.prototype.callWithModelID = function callWithModelID(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ServiceExample.callWithModelID, {
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

ServiceExampleClient.prototype.callDynamicPricing = function callDynamicPricing(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ServiceExample.callDynamicPricing, {
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

ServiceExampleClient.prototype.dynamic_pricing_add = function dynamic_pricing_add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ServiceExample.dynamic_pricing_add, {
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

exports.ServiceExampleClient = ServiceExampleClient;
