// package: 
// file: ProtoFiles/named_entity_recognition_rpc.proto

var ProtoFiles_named_entity_recognition_rpc_pb = require("./named_entity_recognition_rpc_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ShowMessage = (function () {
  function ShowMessage() {}
  ShowMessage.serviceName = "ShowMessage";
  return ShowMessage;
}());

ShowMessage.Show = {
  methodName: "Show",
  service: ShowMessage,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_named_entity_recognition_rpc_pb.InputMessage,
  responseType: ProtoFiles_named_entity_recognition_rpc_pb.OutputMessage
};

exports.ShowMessage = ShowMessage;

function ShowMessageClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ShowMessageClient.prototype.show = function show(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ShowMessage.Show, {
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

exports.ShowMessageClient = ShowMessageClient;

var RecognizeMessage = (function () {
  function RecognizeMessage() {}
  RecognizeMessage.serviceName = "RecognizeMessage";
  return RecognizeMessage;
}());

RecognizeMessage.Recognize = {
  methodName: "Recognize",
  service: RecognizeMessage,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_named_entity_recognition_rpc_pb.InputMessage,
  responseType: ProtoFiles_named_entity_recognition_rpc_pb.OutputMessage
};

exports.RecognizeMessage = RecognizeMessage;

function RecognizeMessageClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RecognizeMessageClient.prototype.recognize = function recognize(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RecognizeMessage.Recognize, {
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

exports.RecognizeMessageClient = RecognizeMessageClient;

