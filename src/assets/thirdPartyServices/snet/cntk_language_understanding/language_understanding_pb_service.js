// package: 
// file: language_understanding.proto

var language_understanding_pb = require("./language_understanding_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var LanguageUnderstanding = (function () {
  function LanguageUnderstanding() {}
  LanguageUnderstanding.serviceName = "LanguageUnderstanding";
  return LanguageUnderstanding;
}());

LanguageUnderstanding.slot_tagging = {
  methodName: "slot_tagging",
  service: LanguageUnderstanding,
  requestStream: false,
  responseStream: false,
  requestType: language_understanding_pb.Input,
  responseType: language_understanding_pb.Output
};

LanguageUnderstanding.intent = {
  methodName: "intent",
  service: LanguageUnderstanding,
  requestStream: false,
  responseStream: false,
  requestType: language_understanding_pb.Input,
  responseType: language_understanding_pb.Output
};

exports.LanguageUnderstanding = LanguageUnderstanding;

function LanguageUnderstandingClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

LanguageUnderstandingClient.prototype.slot_tagging = function slot_tagging(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(LanguageUnderstanding.slot_tagging, {
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

LanguageUnderstandingClient.prototype.intent = function intent(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(LanguageUnderstanding.intent, {
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

exports.LanguageUnderstandingClient = LanguageUnderstandingClient;

