// package: gen_gpt_2
// file: ProtoFiles/ntg.proto

var ProtoFiles_ntg_pb = require("./ntg_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var GENGPT2 = (function () {
  function GENGPT2() {}
  GENGPT2.serviceName = "gen_gpt_2.GENGPT2";
  return GENGPT2;
}());

GENGPT2.gen_gpt_2 = {
  methodName: "gen_gpt_2",
  service: GENGPT2,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_ntg_pb.Query,
  responseType: ProtoFiles_ntg_pb.Answer
};

exports.GENGPT2 = GENGPT2;

function GENGPT2Client(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GENGPT2Client.prototype.gen_gpt_2 = function gen_gpt_2(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(GENGPT2.gen_gpt_2, {
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

exports.GENGPT2Client = GENGPT2Client;

