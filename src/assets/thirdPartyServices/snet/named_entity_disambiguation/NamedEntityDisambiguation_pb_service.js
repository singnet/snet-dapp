// package: 
// file: ProtoFiles/NamedEntityDisambiguation.proto

var ProtoFiles_NamedEntityDisambiguation_pb = require("./NamedEntityDisambiguation_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Disambiguate = (function () {
  function Disambiguate() {}
  Disambiguate.serviceName = "Disambiguate";
  return Disambiguate;
}());

Disambiguate.named_entity_disambiguation = {
  methodName: "named_entity_disambiguation",
  service: Disambiguate,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_NamedEntityDisambiguation_pb.Input,
  responseType: ProtoFiles_NamedEntityDisambiguation_pb.Output
};

exports.Disambiguate = Disambiguate;

function DisambiguateClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

DisambiguateClient.prototype.named_entity_disambiguation = function named_entity_disambiguation(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Disambiguate.named_entity_disambiguation, {
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

exports.DisambiguateClient = DisambiguateClient;

