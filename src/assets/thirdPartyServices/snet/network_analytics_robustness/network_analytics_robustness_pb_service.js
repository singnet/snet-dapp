// package: 
// file: ProtoFiles/network_analytics_robustness.proto

var ProtoFiles_network_analytics_robustness_pb = require("./network_analytics_robustness_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var NetworkAnalyticsRobustness = (function () {
  function NetworkAnalyticsRobustness() {}
  NetworkAnalyticsRobustness.serviceName = "NetworkAnalyticsRobustness";
  return NetworkAnalyticsRobustness;
}());

NetworkAnalyticsRobustness.MinNodesToRemove = {
  methodName: "MinNodesToRemove",
  service: NetworkAnalyticsRobustness,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_network_analytics_robustness_pb.MinNodesToRemoveRequest,
  responseType: ProtoFiles_network_analytics_robustness_pb.MinNodesToRemoveResponse
};

NetworkAnalyticsRobustness.MostImportantNodesEdgesSubset = {
  methodName: "MostImportantNodesEdgesSubset",
  service: NetworkAnalyticsRobustness,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_network_analytics_robustness_pb.MostImportantNodesEdgesSubsetRequest,
  responseType: ProtoFiles_network_analytics_robustness_pb.MostImportantNodesEdgesSubsetResponse
};

exports.NetworkAnalyticsRobustness = NetworkAnalyticsRobustness;

function NetworkAnalyticsRobustnessClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

NetworkAnalyticsRobustnessClient.prototype.minNodesToRemove = function minNodesToRemove(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NetworkAnalyticsRobustness.MinNodesToRemove, {
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

NetworkAnalyticsRobustnessClient.prototype.mostImportantNodesEdgesSubset = function mostImportantNodesEdgesSubset(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NetworkAnalyticsRobustness.MostImportantNodesEdgesSubset, {
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

exports.NetworkAnalyticsRobustnessClient = NetworkAnalyticsRobustnessClient;

