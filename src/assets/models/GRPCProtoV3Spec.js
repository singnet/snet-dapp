import _ from "lodash";
// import { hasOwnDefinedProperty } from "../util";
import GRPCV3Service from "./GRPCV3Service";
import NullGRPCV3Service from "./NullGRPCV3Service";

const hasOwnDefinedProperty = (object, property) => {
  return object.hasOwnProperty(property) && typeof object[property] !== "undefined";
};

export default class GRPCProtoV3Spec {
  constructor(serviceSpec) {
    this._serviceSpec = serviceSpec;
    this._services = this.parseServices();
  }

  parseServices() {
    const packageName = this._getPackageName();
    const specDefinitions = this._getSpecDefinitions(packageName);

    function hasMethods(specDefinition) {
      return specDefinition.hasOwnProperty("methods");
    }

    const services = _.reduce(
      specDefinitions,
      (serviceAccumulator, specDefinition, specKey) => {
        const isService = typeof specDefinition === "object" && specDefinition !== null && hasMethods(specDefinition);

        if (!isService) {
          return serviceAccumulator;
        }

        const service = new GRPCV3Service(specKey, specDefinition);
        return [...serviceAccumulator, service];
      },
      []
    );

    return services;
  }

  _getPackageName() {
    const packageName = _.findKey(this._serviceSpec.nested, obj => {
      return typeof obj === "object" && hasOwnDefinedProperty(obj, "nested");
    });

    return packageName || "";
  }

  _getSpecDefinitions(packageName) {
    if (packageName) {
      return this._serviceSpec.lookup(packageName);
    }

    return this._serviceSpec.nested;
  }

  get services() {
    return [...this._services];
  }

  findServiceByName(serviceName) {
    const service = _.find(this._services, service => service.hasSameName(serviceName));
    return service || new NullGRPCV3Service();
  }
}
