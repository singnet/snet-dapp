export class PricingStrategy {
  constructor(pricingJSON) {
    let pricingData = JSON.parse(pricingJSON);
    this.priceModel = pricingData.price_model;
    if (this.priceModel === "fixed_price") {
      this.pricingModel = new FixedPricing(pricingData);
    } else if (this.priceModel === "fixed_price_per_method") {
      this.pricingModel = new MethodPricing(pricingData);
    }
  }

  getPriceModel() {
    return this.priceModel;
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
    return AGIUtils.inAGI(this.pricingModel.getMaxPriceInCogs());
  }
}

class AGIUtils {
  static toDecimal(agi) {
    return (agi / 100000000).toFixed(8);
  }

  static inAGI(cogs) {
    return (cogs / 100000000).toFixed(8);
  }

  /*static inCogs(web3, value) {
      const BigNumber = require('bignumber.js');
      return new BigNumber(web3.toWei(value, "ether") / (10 ** (10))).toNumber();
    }*/
}

class FixedPricing {
  constructor(pricingData) {
    this.priceInCogs = pricingData.price_in_cogs;
    this.priceInAGI = AGIUtils.inAGI(pricingData.price_in_cogs);
  }

  getPriceInCogs(serviceName, methodName) {
    return this.priceInCogs;
  }

  getPriceInAGI(serviceName, methodName) {
    return this.priceInAGI;
  }

  getMaxPriceInCogs() {
    return this.priceInCogs;
  }
}

class MethodPricing {
  constructor(pricingData) {
    this.maxPriceInCogs = 0;
    this.pricing = {};

    pricingData.details.map((servicePrice, index) => {
      this.pricing[servicePrice.service_name] = {};
      servicePrice.method_pricing.map(methodPrice => {
        if (methodPrice.price_in_cogs > this.maxPriceInCogs) {
          this.maxPriceInCogs = methodPrice.price_in_cogs;
        }
        this.pricing[servicePrice.service_name][methodPrice.method_name] = methodPrice.price_in_cogs;
      });
    });
  }

  getPriceInCogs(serviceName, methodName) {
    let methodPricing = this.pricing[serviceName];
    return methodPricing[methodName];
  }

  getPriceInAGI(serviceName, methodName) {
    let priceInCogs = this.getPriceInCogs(serviceName, methodName);
    return AGIUtils.inAGI(priceInCogs);
  }

  getMaxPriceInCogs() {
    return this.maxPriceInCogs;
  }
}
