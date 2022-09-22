/* eslint-disable */
// package: 
// file: src/assets/thirdPartyServices/nunet-org/fake_news_score_service/fake_news_score.proto

var src_assets_thirdPartyServices_nunet_org_fake_news_score_service_fake_news_score_pb = require("../../../../../src/assets/thirdPartyServices/nunet-org/fake_news_score_service/fake_news_score_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var FakeNewsScore = (function () {
  function FakeNewsScore() {}
  FakeNewsScore.serviceName = "FakeNewsScore";
  return FakeNewsScore;
}());

FakeNewsScore.fn_score_calc = {
  methodName: "fn_score_calc",
  service: FakeNewsScore,
  requestStream: false,
  responseStream: false,
  requestType: src_assets_thirdPartyServices_nunet_org_fake_news_score_service_fake_news_score_pb.InputFNS,
  responseType: src_assets_thirdPartyServices_nunet_org_fake_news_score_service_fake_news_score_pb.Resp
};

exports.FakeNewsScore = FakeNewsScore;

function FakeNewsScoreClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FakeNewsScoreClient.prototype.fn_score_calc = function fn_score_calc(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(FakeNewsScore.fn_score_calc, {
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

exports.FakeNewsScoreClient = FakeNewsScoreClient;

