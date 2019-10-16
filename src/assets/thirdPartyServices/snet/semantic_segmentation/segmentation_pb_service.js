// package: 
// file: ProtoFiles/segmentation.proto

var ProtoFiles_segmentation_pb = require("./segmentation_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SemanticSegmentation = (function () {
  function SemanticSegmentation() {}
  SemanticSegmentation.serviceName = "SemanticSegmentation";
  return SemanticSegmentation;
}());

SemanticSegmentation.segment = {
  methodName: "segment",
  service: SemanticSegmentation,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_segmentation_pb.Request,
  responseType: ProtoFiles_segmentation_pb.Result
};

SemanticSegmentation.meta = {
  methodName: "meta",
  service: SemanticSegmentation,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_segmentation_pb.MetaRequest,
  responseType: ProtoFiles_segmentation_pb.MetaResult
};

exports.SemanticSegmentation = SemanticSegmentation;

function SemanticSegmentationClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SemanticSegmentationClient.prototype.segment = function segment(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SemanticSegmentation.segment, {
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

SemanticSegmentationClient.prototype.meta = function meta(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SemanticSegmentation.meta, {
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

exports.SemanticSegmentationClient = SemanticSegmentationClient;

