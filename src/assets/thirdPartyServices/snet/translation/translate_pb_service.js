// package: 
// file: ProtoFiles/translate.proto

var ProtoFiles_translate_pb = require("./translate_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Translation = (function () {
  function Translation() {}
  Translation.serviceName = "Translation";
  return Translation;
}());

Translation.translate = {
  methodName: "translate",
  service: Translation,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_translate_pb.Request,
  responseType: ProtoFiles_translate_pb.Result
};

exports.Translation = Translation;

function TranslationClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TranslationClient.prototype.translate = function translate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Translation.translate, {
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

exports.TranslationClient = TranslationClient;

