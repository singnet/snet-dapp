export default class GRPCV3Service {
  constructor(serviceName, serviceObject) {
    this._serviceName = serviceName;

    this._methodNames = Object.keys(serviceObject["methods"]);
  }

  get serviceName() {
    return this._serviceName;
  }

  get methodNames() {
    return [...this._methodNames];
  }

  hasSameName(serviceName) {
    return this._serviceName === serviceName;
  }
}
