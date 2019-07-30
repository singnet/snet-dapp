import { PricingStrategy } from '../utility/PricingStrategy';

const service = {
  service_row_id: 1,
  org_id: 'snet',
  service_id: 'example-service',
  price_model: 'fixed_price',
  price_in_cogs: '1.00000000',
  pricing: '{"price_model": "fixed_price", "price_in_cogs": 1}',
  display_name: 'Example Service',
  description: 'Simple example service.',
  url: 'https://github.com/singnet/example-service',
  display_image_url: null,
  assets_url: '{}',
  assets_hash: '{"hero_image": "QmT8R46N7mf16aELii2AZxRnvYa4Tgy1WgEAZ2aXK2U76N/hero_example_service.jpg"}',
  rating: null,
  service_rating: 3.63736,
  total_users_rated: 91,
  tags: ['example', 'tutorial'],
  is_available: 1,
  hero_image: null,
  pricing_strategy: {
    priceModel: 'fixed_price',
    pricingModel: {
      priceInCogs: 1
    }
  }
};

const pricing = service["pricing"];
service.pricing_strategy = new PricingStrategy(pricing);

export default {
  userReducer: {
    login: {
      isLoggedIn: true,
    }
  },
  serviceReducer: {
    serviceMethodExecution: {
      isComplete: false,
    },
    services: [service]
  }
};
