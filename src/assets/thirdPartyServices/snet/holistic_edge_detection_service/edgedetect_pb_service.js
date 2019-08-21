// package: 
// file: ProtoFiles/edgedetect.proto

var ProtoFiles_edgedetect_pb = require("./edgedetect_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Edgedetect = (function () {
  function Edgedetect() {}
  Edgedetect.serviceName = "Edgedetect";
  return Edgedetect;
}());

Edgedetect.DetectEdge = {
  methodName: "DetectEdge",
  service: Edgedetect,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_edgedetect_pb.ImageFile,
  responseType: ProtoFiles_edgedetect_pb.ImageFile
};

exports.Edgedetect = Edgedetect;

function EdgedetectClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

EdgedetectClient.prototype.detectEdge = function detectEdge(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Edgedetect.DetectEdge, {
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

exports.EdgedetectClient = EdgedetectClient;

