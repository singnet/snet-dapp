// package: 
// file: ProtoFiles/romance_translator.proto

var ProtoFiles_romance_translator_pb = require("./romance_translator_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var RomanceTranslator = (function () {
  function RomanceTranslator() {}
  RomanceTranslator.serviceName = "RomanceTranslator";
  return RomanceTranslator;
}());

RomanceTranslator.translate = {
  methodName: "translate",
  service: RomanceTranslator,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_romance_translator_pb.Input,
  responseType: ProtoFiles_romance_translator_pb.Output
};

exports.RomanceTranslator = RomanceTranslator;

function RomanceTranslatorClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RomanceTranslatorClient.prototype.translate = function translate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(RomanceTranslator.translate, {
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

exports.RomanceTranslatorClient = RomanceTranslatorClient;

