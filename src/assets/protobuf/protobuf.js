import protobuf from "protobufjs";

/**
 * @class Protobuf
 * @param jsonDescriptor
 */
export default class ProtoBuf {
  constructor({ jsonDescriptor }) {
    this.json = jsonDescriptor;
    this.root = protobuf.Root.fromJSON(jsonDescriptor);

    this.services = {};

    this.mockValue = this.mockValue.bind(this);
    this.generateStubs = this.generateStubs.bind(this);
    this.isValidMessage = this.isValidMessage.bind(this);
    this.findServiceByMethod = this.findServiceByMethod.bind(this);
    this.getFieldsFromMessage = this.getFieldsFromMessage.bind(this);
  }

  mockValue(type, rule) {
    if (rule === "repeated") {
      //TODO handle array types
      //It's an array of type
      return [];
    }

    switch (type) {
      case "string":
        return new String();
      case "bool":
        return new Boolean();
      case "float":
        return new Number();
      case "double":
        return new Number();
      case "bytes":
        return new Uint8Array();
      default:
        return "";
    }
  }

  getFieldsFromMessage(message) {
    let fields = {};
    Object.entries(message.fields).forEach(([fieldKey, fieldValue]) => {
      fieldValue = this.mockValue(fieldValue.type, fieldValue.rule);
      Object.assign(fields, { [fieldKey]: fieldValue });
    });
    return fields;
  }

  findServiceByMethod(methodName) {
    let found = undefined;
    Object.entries(this.services).forEach(([serviceName, service]) => {
      const methods = Object.keys(service.methods);
      if (methods.indexOf(methodName) !== -1) {
        found = serviceName;
      }
    });
    return found;
  }

  isValidMessage(message, payload) {
    if (message.verify(payload)) return false;
    else return true;
  }

  generateStubs(rpcCallMethod) {
    rpcCallMethod = rpcCallMethod || (() => undefined);
    traverseServices(this.root, service => {
      const CurrentClass = this.root.lookup(service.name);
      const currentClass = CurrentClass.create(rpcCallMethod, false, false);

      Object.entries(service.methods).forEach(([methodName, { requestType, responseType }]) => {
        const RequestType = this.root.lookupType(requestType);
        const ResponseType = this.root.lookupType(responseType);
        const call = params => currentClass[methodName](params);
        Object.assign(this.services, {
          [service.name]: { methods: { [methodName]: { call, RequestType, ResponseType } } },
        });
      });
    });
  }
}

function traverseServices(current, fn) {
  if (current instanceof protobuf.Service)
    // and/or protobuf.Enum, protobuf.Service etc.
    fn(current);
  if (current.nestedArray)
    current.nestedArray.forEach(nested => {
      traverseServices(nested, fn);
    });
}
