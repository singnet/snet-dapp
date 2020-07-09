// package: series_decomposition
// file: fbprophet_forecast.proto

var fbprophet_forecast_pb = require("./fbprophet_forecast_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Forecast = (function () {
  function Forecast() {}
  Forecast.serviceName = "series_decomposition.Forecast";
  return Forecast;
}());

Forecast.forecast = {
  methodName: "forecast",
  service: Forecast,
  requestStream: false,
  responseStream: false,
  requestType: fbprophet_forecast_pb.Input,
  responseType: fbprophet_forecast_pb.Output
};

exports.Forecast = Forecast;

function ForecastClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ForecastClient.prototype.forecast = function forecast(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Forecast.forecast, {
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

exports.ForecastClient = ForecastClient;

