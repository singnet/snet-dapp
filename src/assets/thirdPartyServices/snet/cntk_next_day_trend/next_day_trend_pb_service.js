// package: 
// file: ProtoFiles/next_day_trend.proto

var ProtoFiles_next_day_trend_pb = require("./next_day_trend_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var NextDayTrend = (function () {
  function NextDayTrend() {}
  NextDayTrend.serviceName = "NextDayTrend";
  return NextDayTrend;
}());

NextDayTrend.trend = {
  methodName: "trend",
  service: NextDayTrend,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_next_day_trend_pb.Input,
  responseType: ProtoFiles_next_day_trend_pb.Output
};

exports.NextDayTrend = NextDayTrend;

function NextDayTrendClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

NextDayTrendClient.prototype.trend = function trend(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(NextDayTrend.trend, {
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

exports.NextDayTrendClient = NextDayTrendClient;

