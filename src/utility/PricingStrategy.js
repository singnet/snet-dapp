const priceData = {
  fixed_price_model: "fixed_price",
  fixed_price_per_method: "fixed_price_per_method",
  agi_precision: 100000000,
  agi_divisibility: 8,
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
    return AGIUtils.inAGI(this.pricingModel.getMaxPriceInCogs());
  }
}

class AGIUtils {
  static inAGI(cogs) {
    return (cogs / priceData.agi_precision).toFixed(priceData.agi_divisibility);
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
    return AGIUtils.inAGI(this.price_in_cogs);
  }

  getMaxPriceInCogs() {
    return this.priceInCogs;
  }
}

class MethodPricing {
  constructor(pricingData) {
    this.maxPriceInCogs = 0;
    this.pricing = {};

    pricingData.details.map(servicePrice => {
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
    const methodPricing = this.pricing[serviceName];
    return methodPricing[methodName];
  }

  getPriceInAGI(serviceName, methodName) {
    const priceInCogs = this.getPriceInCogs(serviceName, methodName);
    return AGIUtils.inAGI(priceInCogs);
  }

  getMaxPriceInCogs() {
    return this.maxPriceInCogs;
  }
}

export const cogsToAgi = cogs => (cogs / priceData.agi_precision).toFixed(priceData.agi_divisibility);

export const agiToCogs = agi => agi * priceData.agi_precision;

export const txnTypes = {
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
};
