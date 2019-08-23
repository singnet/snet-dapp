// package: qa
// file: ProtoFiles/qa.proto

var ProtoFiles_qa_pb = require("./qa_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var QA = (function () {
  function QA() {}
  QA.serviceName = "qa.QA";
  return QA;
}());

QA.qa = {
  methodName: "qa",
  service: QA,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_qa_pb.Question,
  responseType: ProtoFiles_qa_pb.Answer
};

exports.QA = QA;

function QAClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

QAClient.prototype.qa = function qa(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QA.qa, {
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

exports.QAClient = QAClient;

