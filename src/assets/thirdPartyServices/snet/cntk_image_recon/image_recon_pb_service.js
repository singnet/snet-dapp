// package: 
// file: image_recon.proto

var image_recon_pb = require("./image_recon_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Recognizer = (function () {
  function Recognizer() {}
  Recognizer.serviceName = "Recognizer";
  return Recognizer;
}());

Recognizer.flowers = {
  methodName: "flowers",
  service: Recognizer,
  requestStream: false,
  responseStream: false,
  requestType: image_recon_pb.Input,
  responseType: image_recon_pb.Output
};

Recognizer.dogs = {
  methodName: "dogs",
  service: Recognizer,
  requestStream: false,
  responseStream: false,
  requestType: image_recon_pb.Input,
  responseType: image_recon_pb.Output
};

exports.Recognizer = Recognizer;

function RecognizerClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

RecognizerClient.prototype.flowers = function flowers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Recognizer.flowers, {
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

RecognizerClient.prototype.dogs = function dogs(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Recognizer.dogs, {
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

exports.RecognizerClient = RecognizerClient;

