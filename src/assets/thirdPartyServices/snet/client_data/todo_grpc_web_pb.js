
/*eslint-disable*/
/**
 * @fileoverview gRPC-Web generated client stub for 
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = require('./todo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.TodoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.TodoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Empty,
 *   !proto.TodoList>}
 */
const methodDescriptor_TodoService_List = new grpc.web.MethodDescriptor(
  '/TodoService/List',
  grpc.web.MethodType.UNARY,
  proto.Empty,
  proto.TodoList,
  /**
   * @param {!proto.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.TodoList.deserializeBinary
);


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.TodoList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.TodoList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TodoServiceClient.prototype.list =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TodoService/List',
      request,
      metadata || {},
      methodDescriptor_TodoService_List,
      callback);
};


/**
 * @param {!proto.Empty} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.TodoList>}
 *     Promise that resolves to the response
 */
proto.TodoServicePromiseClient.prototype.list =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TodoService/List',
      request,
      metadata || {},
      methodDescriptor_TodoService_List);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.Todo,
 *   !proto.Todo>}
 */
const methodDescriptor_TodoService_Insert = new grpc.web.MethodDescriptor(
  '/TodoService/Insert',
  grpc.web.MethodType.UNARY,
  proto.Todo,
  proto.Todo,
  /**
   * @param {!proto.Todo} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.Todo.deserializeBinary
);


/**
 * @param {!proto.Todo} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.Todo)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.Todo>|undefined}
 *     The XHR Node Readable Stream
 */
proto.TodoServiceClient.prototype.insert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/TodoService/Insert',
      request,
      metadata || {},
      methodDescriptor_TodoService_Insert,
      callback);
};


/**
 * @param {!proto.Todo} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.Todo>}
 *     Promise that resolves to the response
 */
proto.TodoServicePromiseClient.prototype.insert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/TodoService/Insert',
      request,
      metadata || {},
      methodDescriptor_TodoService_Insert);
};


module.exports = proto;

