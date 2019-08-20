// package: 
// file: ProtoFiles/time_series_forecast.proto

var ProtoFiles_time_series_forecast_pb = require("./time_series_forecast_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Forecast = (function () {
  function Forecast() {}
  Forecast.serviceName = "Forecast";
  return Forecast;
}());

Forecast.forecast = {
  methodName: "forecast",
  service: Forecast,
  requestStream: false,
  responseStream: false,
  requestType: ProtoFiles_time_series_forecast_pb.Input,
  responseType: ProtoFiles_time_series_forecast_pb.Output
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

