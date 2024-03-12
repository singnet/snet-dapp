// package: escrow
// file: token_service.proto

var token_service_pb = require("./token_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TokenService = (function () {
  function TokenService() {}
  TokenService.serviceName = "escrow.TokenService";
  return TokenService;
}());

TokenService.GetToken = {
  methodName: "GetToken",
  service: TokenService,
  requestStream: false,
  responseStream: false,
  requestType: token_service_pb.TokenRequest,
  responseType: token_service_pb.TokenReply
};

exports.TokenService = TokenService;

function TokenServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TokenServiceClient.prototype.getToken = function getToken(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TokenService.GetToken, {
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

exports.TokenServiceClient = TokenServiceClient;

