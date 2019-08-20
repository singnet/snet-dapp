// package: 
// file: ProtoFiles/style_transfer.proto

var ProtoFiles_style_transfer_pb = require("./style_transfer_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var StyleTransfer = (function () {
  function StyleTransfer() {}
  StyleTransfer.serviceName = "StyleTransfer";
  return StyleTransfer;
}());

StyleTransfer.transfer_image_style = {
  methodName: "transfer_image_style",
  service: StyleTransfer,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_style_transfer_pb.TransferImageStyleRequest,
  responseType: ProtoFiles_style_transfer_pb.Image
};

exports.StyleTransfer = StyleTransfer;

function StyleTransferClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

StyleTransferClient.prototype.transfer_image_style = function transfer_image_style(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(StyleTransfer.transfer_image_style, {
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

exports.StyleTransferClient = StyleTransferClient;

