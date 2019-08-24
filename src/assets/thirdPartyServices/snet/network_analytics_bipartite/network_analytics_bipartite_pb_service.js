// package: 
// file: ProtoFiles/network_analytics_bipartite.proto

var ProtoFiles_network_analytics_bipartite_pb = require("./network_analytics_bipartite_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var NetworkAnalyticsBipartite = (function () {
  function NetworkAnalyticsBipartite() {}
  NetworkAnalyticsBipartite.serviceName = "NetworkAnalyticsBipartite";
  return NetworkAnalyticsBipartite;
}());

NetworkAnalyticsBipartite.BipartiteGraph = {
  methodName: "BipartiteGraph",
  service: NetworkAnalyticsBipartite,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_network_analytics_bipartite_pb.BipartiteGraphRequest,
  responseType: ProtoFiles_network_analytics_bipartite_pb.BipartiteGraphResponse
};

NetworkAnalyticsBipartite.ProjectedGraph = {
  methodName: "ProjectedGraph",
  service: NetworkAnalyticsBipartite,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_network_analytics_bipartite_pb.ProjecetedGraphRequest,
  responseType: ProtoFiles_network_analytics_bipartite_pb.ProjecetedGraphResponse
};

exports.NetworkAnalyticsBipartite = NetworkAnalyticsBipartite;

function NetworkAnalyticsBipartiteClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

NetworkAnalyticsBipartiteClient.prototype.bipartiteGraph = function bipartiteGraph(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NetworkAnalyticsBipartite.BipartiteGraph, {
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

NetworkAnalyticsBipartiteClient.prototype.projectedGraph = function projectedGraph(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NetworkAnalyticsBipartite.ProjectedGraph, {
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

exports.NetworkAnalyticsBipartiteClient = NetworkAnalyticsBipartiteClient;

