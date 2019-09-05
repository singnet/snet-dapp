// package: qa_bert
// file: ProtoFiles/qa_bert.proto

var ProtoFiles_qa_bert_pb = require("./qa_bert_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var QABERT = (function () {
  function QABERT() {}
  QABERT.serviceName = "qa_bert.QABERT";
  return QABERT;
}());

QABERT.qa_bert = {
  methodName: "qa_bert",
  service: QABERT,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_qa_bert_pb.Question,
  responseType: ProtoFiles_qa_bert_pb.Answer
};

exports.QABERT = QABERT;

function QABERTClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

QABERTClient.prototype.qa_bert = function qa_bert(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(QABERT.qa_bert, {
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

exports.QABERTClient = QABERTClient;

