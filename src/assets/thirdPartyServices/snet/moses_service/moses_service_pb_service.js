// package: 
// file: ProtoFiles/moses_service.proto

var ProtoFiles_moses_service_pb = require("./moses_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MosesService = (function () {
  function MosesService() {}
  MosesService.serviceName = "MosesService";
  return MosesService;
}());

MosesService.StartAnalysis = {
  methodName: "StartAnalysis",
  service: MosesService,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_moses_service_pb.AnalysisParameters,
  responseType: ProtoFiles_moses_service_pb.Result
};

exports.MosesService = MosesService;

function MosesServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MosesServiceClient.prototype.startAnalysis = function startAnalysis(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MosesService.StartAnalysis, {
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

exports.MosesServiceClient = MosesServiceClient;

