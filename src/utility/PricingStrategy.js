import { cogsToToken as cogsToTokenSDK, tokenToCogs as tokenToCogsSDK } from "snet-sdk-web/utils/tokenUtils";

const TOKEN_DIVISIBILITY = {
  FET: 18,
  AGIX: 8,
};

export const DIVISIBILITY = TOKEN_DIVISIBILITY[process.env.REACT_APP_TOKEN_NAME];

const priceData = {
  fixed_price_model: "fixed_price",
  fixed_price_per_method: "fixed_price_per_method",
};

const priceModelNames = {
  fixed_price: "Fixed price",
  fixed_price_per_method: "Method based price",
};

export class PricingStrategy {
  constructor(pricing) {
    this.priceModel = pricing.price_model;
    if (this.priceModel === priceData.fixed_price_model) {
      this.pricingModel = new FixedPricing(pricing);
    } else if (this.priceModel === priceData.fixed_price_per_method) {
      this.pricingModel = new MethodPricing(pricing);
    }
  }

  getPriceModel() {
    return priceModelNames[this.priceModel];
  }

  getPriceInCogs(serviceName, methodName) {
    return this.pricingModel.getPriceInCogs(serviceName, methodName);
  }

  getPriceInAGI(serviceName, methodName) {
    return this.pricingModel.getPriceInAGI(serviceName, methodName);
  }

  getMaxPriceInCogs() {
    return this.pricingModel.getMaxPriceInCogs();
  }

  getMaxPriceInAGI() {
    return cogsToToken(this.pricingModel.getMaxPriceInCogs());
  }
}

class FixedPricing {
  constructor(pricingData) {
    this.priceInCogs = pricingData.price_in_cogs;
  }

  getPriceInCogs(serviceName, methodName) {
    return this.priceInCogs;
  }

  getPriceInAGI(serviceName, methodName) {
    return cogsToToken(this.priceInCogs);
  }

  getMaxPriceInCogs() {
    return this.priceInCogs;
  }
}

class MethodPricing {
  constructor(pricingData) {
    this.maxPriceInCogs = 0;
    this.pricing = {};

    pricingData.details.map((servicePrice) => {
      this.pricing[servicePrice.service_name] = {};
      return servicePrice.method_pricing.map((methodPrice) => {
        if (methodPrice.price_in_cogs > this.maxPriceInCogs) {
          return (this.maxPriceInCogs = methodPrice.price_in_cogs);
        }
        return (this.pricing[servicePrice.service_name][methodPrice.method_name] = methodPrice.price_in_cogs);
      });
    });
  }

  getPriceInCogs(serviceName, methodName) {
    const methodPricing = this.pricing[serviceName];
    return methodPricing[methodName];
  }

  getPriceInAGI(serviceName, methodName) {
    const priceInCogs = this.getPriceInCogs(serviceName, methodName);
    return priceInCogs(priceInCogs);
  }

  getMaxPriceInCogs() {
    return this.maxPriceInCogs;
  }
}

export const cogsToToken = (cogs) => cogsToTokenSDK(cogs, [process.env.REACT_APP_TOKEN_NAME]);
export const tokenToCogs = (tokens) => tokenToCogsSDK(tokens, [process.env.REACT_APP_TOKEN_NAME]);

export const agiInDecimal = (agi) => parseFloat(agi).toFixed(priceData.divisibility);

export const tenYearBlockOffset = 10 * 365 * 24 * 60 * 4;

export const txnTypes = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};
