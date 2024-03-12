// package: escrow
// file: state_service.proto

var state_service_pb = require("./state_service_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var PaymentChannelStateService = (function () {
  function PaymentChannelStateService() {}
  PaymentChannelStateService.serviceName = "escrow.PaymentChannelStateService";
  return PaymentChannelStateService;
}());

PaymentChannelStateService.GetChannelState = {
  methodName: "GetChannelState",
  service: PaymentChannelStateService,
  requestStream: false,
  responseStream: false,
  requestType: state_service_pb.ChannelStateRequest,
  responseType: state_service_pb.ChannelStateReply
};

exports.PaymentChannelStateService = PaymentChannelStateService;

function PaymentChannelStateServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PaymentChannelStateServiceClient.prototype.getChannelState = function getChannelState(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(PaymentChannelStateService.GetChannelState, {
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

exports.PaymentChannelStateServiceClient = PaymentChannelStateServiceClient;

var FreeCallStateService = (function () {
  function FreeCallStateService() {}
  FreeCallStateService.serviceName = "escrow.FreeCallStateService";
  return FreeCallStateService;
}());

FreeCallStateService.GetFreeCallsAvailable = {
  methodName: "GetFreeCallsAvailable",
  service: FreeCallStateService,
  requestStream: false,
  responseStream: false,
  requestType: state_service_pb.FreeCallStateRequest,
  responseType: state_service_pb.FreeCallStateReply
};

exports.FreeCallStateService = FreeCallStateService;

function FreeCallStateServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FreeCallStateServiceClient.prototype.getFreeCallsAvailable = function getFreeCallsAvailable(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FreeCallStateService.GetFreeCallsAvailable, {
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

exports.FreeCallStateServiceClient = FreeCallStateServiceClient;

