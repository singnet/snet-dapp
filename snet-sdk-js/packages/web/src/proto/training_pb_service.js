// package: training
// file: singnet/snet-daemon/training/training.proto

var singnet_snet_daemon_training_training_pb = require("./training_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Model = (function () {
  function Model() {}
  Model.serviceName = "training.Model";
  return Model;
}());

Model.create_model = {
  methodName: "create_model",
  service: Model,
  requestStream: false,
  responseStream: false,
  requestType: singnet_snet_daemon_training_training_pb.CreateModelRequest,
  responseType: singnet_snet_daemon_training_training_pb.ModelDetailsResponse
};

Model.delete_model = {
  methodName: "delete_model",
  service: Model,
  requestStream: false,
  responseStream: false,
  requestType: singnet_snet_daemon_training_training_pb.UpdateModelRequest,
  responseType: singnet_snet_daemon_training_training_pb.ModelDetailsResponse
};

Model.get_model_status = {
  methodName: "get_model_status",
  service: Model,
  requestStream: false,
  responseStream: false,
  requestType: singnet_snet_daemon_training_training_pb.ModelDetailsRequest,
  responseType: singnet_snet_daemon_training_training_pb.ModelDetailsResponse
};

Model.update_model_access = {
  methodName: "update_model_access",
  service: Model,
  requestStream: false,
  responseStream: false,
  requestType: singnet_snet_daemon_training_training_pb.UpdateModelRequest,
  responseType: singnet_snet_daemon_training_training_pb.ModelDetailsResponse
};

Model.get_all_models = {
  methodName: "get_all_models",
  service: Model,
  requestStream: false,
  responseStream: false,
  requestType: singnet_snet_daemon_training_training_pb.AccessibleModelsRequest,
  responseType: singnet_snet_daemon_training_training_pb.AccessibleModelsResponse
};

exports.Model = Model;

function ModelClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ModelClient.prototype.create_model = function create_model(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Model.create_model, {
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

ModelClient.prototype.delete_model = function delete_model(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Model.delete_model, {
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

ModelClient.prototype.get_model_status = function get_model_status(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Model.get_model_status, {
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

ModelClient.prototype.update_model_access = function update_model_access(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Model.update_model_access, {
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

ModelClient.prototype.get_all_models = function get_all_models(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Model.get_all_models, {
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

exports.ModelClient = ModelClient;

