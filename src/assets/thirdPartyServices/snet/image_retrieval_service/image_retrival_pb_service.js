// package: 
// file: ProtoFiles/image_retrival.proto

var ProtoFiles_image_retrival_pb = require("./image_retrival_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var SimilarImage = (function () {
  function SimilarImage() {}
  SimilarImage.serviceName = "SimilarImage";
  return SimilarImage;
}());

SimilarImage.FindSimilar = {
  methodName: "FindSimilar",
  service: SimilarImage,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_image_retrival_pb.ImageFileIn,
  responseType: ProtoFiles_image_retrival_pb.ImageFileOut
};

exports.SimilarImage = SimilarImage;

function SimilarImageClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SimilarImageClient.prototype.findSimilar = function findSimilar(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(SimilarImage.FindSimilar, {
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

exports.SimilarImageClient = SimilarImageClient;

