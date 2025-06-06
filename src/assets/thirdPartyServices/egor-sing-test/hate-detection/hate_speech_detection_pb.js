// source: hate_speech_detection.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require("google-protobuf");
var goog = jspb;
var global = function () {
  return this || window || global || self || Function("return this")();
}.call(null);

goog.exportSymbol("hsd_naint_HSD.Input", null, global);
goog.exportSymbol("hsd_naint_HSD.Output", null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
hsd_naint_HSD.Input = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(hsd_naint_HSD.Input, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  hsd_naint_HSD.Input.displayName = "hsd_naint_HSD.Input";
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
hsd_naint_HSD.Output = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(hsd_naint_HSD.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  hsd_naint_HSD.Output.displayName = "hsd_naint_HSD.Output";
}

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  hsd_naint_HSD.Input.prototype.toObject = function (opt_includeInstance) {
    return hsd_naint_HSD.Input.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!hsd_naint_HSD.Input} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  hsd_naint_HSD.Input.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        value: jspb.Message.getFieldWithDefault(msg, 1, ""),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!hsd_naint_HSD.Input}
 */
hsd_naint_HSD.Input.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new hsd_naint_HSD.Input();
  return hsd_naint_HSD.Input.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!hsd_naint_HSD.Input} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!hsd_naint_HSD.Input}
 */
hsd_naint_HSD.Input.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setValue(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
hsd_naint_HSD.Input.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  hsd_naint_HSD.Input.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!hsd_naint_HSD.Input} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
hsd_naint_HSD.Input.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getValue();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
};

/**
 * optional string value = 1;
 * @return {string}
 */
hsd_naint_HSD.Input.prototype.getValue = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/**
 * @param {string} value
 * @return {!hsd_naint_HSD.Input} returns this
 */
hsd_naint_HSD.Input.prototype.setValue = function (value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

if (jspb.Message.GENERATE_TO_OBJECT) {
  /**
   * Creates an object representation of this proto.
   * Field names that are reserved in JavaScript and will be renamed to pb_name.
   * Optional fields that are not set will be set to undefined.
   * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
   * For the list of reserved names please see:
   *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
   * @param {boolean=} opt_includeInstance Deprecated. whether to include the
   *     JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @return {!Object}
   */
  hsd_naint_HSD.Output.prototype.toObject = function (opt_includeInstance) {
    return hsd_naint_HSD.Output.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!hsd_naint_HSD.Output} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  hsd_naint_HSD.Output.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        result: jspb.Message.getFieldWithDefault(msg, 1, ""),
      };

    if (includeInstance) {
      obj.$jspbMessageInstance = msg;
    }
    return obj;
  };
}

/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!hsd_naint_HSD.Output}
 */
hsd_naint_HSD.Output.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new hsd_naint_HSD.Output();
  return hsd_naint_HSD.Output.deserializeBinaryFromReader(msg, reader);
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!hsd_naint_HSD.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!hsd_naint_HSD.Output}
 */
hsd_naint_HSD.Output.deserializeBinaryFromReader = function (msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ (reader.readString());
        msg.setResult(value);
        break;
      default:
        reader.skipField();
        break;
    }
  }
  return msg;
};

/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
hsd_naint_HSD.Output.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  hsd_naint_HSD.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!hsd_naint_HSD.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
hsd_naint_HSD.Output.serializeBinaryToWriter = function (message, writer) {
  var f = undefined;
  f = message.getResult();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
};

/**
 * optional string result = 1;
 * @return {string}
 */
hsd_naint_HSD.Output.prototype.getResult = function () {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};

/**
 * @param {string} value
 * @return {!hsd_naint_HSD.Output} returns this
 */
hsd_naint_HSD.Output.prototype.setResult = function (value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};

goog.object.extend(exports, hsd_naint_HSD);
