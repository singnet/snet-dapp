// package: example_service
// file: singnet/example-service/service/service_spec/example_service.proto
/* eslint-disable */

var singnet_example_service_service_service_spec_example_service_pb = require("./example_service_pb");
var singnet_snet_daemon_pricing_pricing_pb = require("./pricing_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Calculator = (function () {
  function Calculator() {}
  Calculator.serviceName = "example_service.Calculator";
  return Calculator;
}());

Calculator.train_add = {
  methodName: "train_add",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.TrainingRequest,
  responseType: singnet_example_service_service_service_spec_example_service_pb.TrainingResponse
};

Calculator.train_subtraction = {
  methodName: "train_subtraction",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.TrainingRequest,
  responseType: singnet_example_service_service_service_spec_example_service_pb.TrainingResponse
};

Calculator.dynamic_pricing_train_add = {
  methodName: "dynamic_pricing_train_add",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.TrainingRequest,
  responseType: singnet_snet_daemon_pricing_pricing_pb.PriceInCogs
};

Calculator.dynamic_pricing_add = {
  methodName: "dynamic_pricing_add",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.Numbers,
  responseType: singnet_snet_daemon_pricing_pricing_pb.PriceInCogs
};

Calculator.add = {
  methodName: "add",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.Numbers,
  responseType: singnet_example_service_service_service_spec_example_service_pb.Result
};

Calculator.sub = {
  methodName: "sub",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.Numbers,
  responseType: singnet_example_service_service_service_spec_example_service_pb.Result
};

Calculator.mul = {
  methodName: "mul",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.Numbers,
  responseType: singnet_example_service_service_service_spec_example_service_pb.Result
};

Calculator.div = {
  methodName: "div",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: singnet_example_service_service_service_spec_example_service_pb.Numbers,
  responseType: singnet_example_service_service_service_spec_example_service_pb.Result
};

exports.Calculator = Calculator;

function CalculatorClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CalculatorClient.prototype.train_add = function train_add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.train_add, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

CalculatorClient.prototype.train_subtraction = function train_subtraction(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.train_subtraction, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

CalculatorClient.prototype.dynamic_pricing_train_add = function dynamic_pricing_train_add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.dynamic_pricing_train_add, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

CalculatorClient.prototype.dynamic_pricing_add = function dynamic_pricing_add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.dynamic_pricing_add, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

CalculatorClient.prototype.add = function add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.add, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

CalculatorClient.prototype.sub = function sub(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.sub, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

CalculatorClient.prototype.mul = function mul(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.mul, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

CalculatorClient.prototype.div = function div(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.div, {
    request: requestMessage,
    host: this.serviceHost,
    metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd (response) {
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
    cancel () {
      callback = null;
      client.close();
    }
  };
};

exports.CalculatorClient = CalculatorClient;

