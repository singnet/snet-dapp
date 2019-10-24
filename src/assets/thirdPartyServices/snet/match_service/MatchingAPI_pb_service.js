// package: MatchingApi
// file: MatchingAPI.proto

var MatchingAPI_pb = require("./MatchingAPI_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MatchApi = (function () {
  function MatchApi() {}
  MatchApi.serviceName = "MatchingApi.MatchApi";
  return MatchApi;
}());

MatchApi.getKP = {
  methodName: "getKP",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.keypointRequest,
  responseType: MatchingAPI_pb.keypointResponse
};

MatchApi.getDescByImage = {
  methodName: "getDescByImage",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.descriptorRequest,
  responseType: MatchingAPI_pb.descriptorResponse
};

MatchApi.getDescByKps = {
  methodName: "getDescByKps",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.descriptorByKpsRequest,
  responseType: MatchingAPI_pb.descriptorResponse
};

MatchApi.getMatch = {
  methodName: "getMatch",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.matchingRequest,
  responseType: MatchingAPI_pb.matchingResponse
};

MatchApi.getMatchByImage = {
  methodName: "getMatchByImage",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.matchingByImageRequest,
  responseType: MatchingAPI_pb.matchingByImageResponse
};

MatchApi.getTransformParameters = {
  methodName: "getTransformParameters",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.transformRequest,
  responseType: MatchingAPI_pb.transformResponse
};

MatchApi.getTransformParametersByImage = {
  methodName: "getTransformParametersByImage",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.transformByImageRequest,
  responseType: MatchingAPI_pb.transformResponse
};

MatchApi.getClosestImages = {
  methodName: "getClosestImages",
  service: MatchApi,
  requestStream: false,
  responseStream: false,
  requestType: MatchingAPI_pb.imageRetrievalRequest,
  responseType: MatchingAPI_pb.imageRetrievalResponse
};

exports.MatchApi = MatchApi;

function MatchApiClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MatchApiClient.prototype.getKP = function getKP(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getKP, {
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

MatchApiClient.prototype.getDescByImage = function getDescByImage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getDescByImage, {
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

MatchApiClient.prototype.getDescByKps = function getDescByKps(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getDescByKps, {
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

MatchApiClient.prototype.getMatch = function getMatch(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getMatch, {
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

MatchApiClient.prototype.getMatchByImage = function getMatchByImage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getMatchByImage, {
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

MatchApiClient.prototype.getTransformParameters = function getTransformParameters(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getTransformParameters, {
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

MatchApiClient.prototype.getTransformParametersByImage = function getTransformParametersByImage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getTransformParametersByImage, {
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

MatchApiClient.prototype.getClosestImages = function getClosestImages(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MatchApi.getClosestImages, {
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

exports.MatchApiClient = MatchApiClient;

